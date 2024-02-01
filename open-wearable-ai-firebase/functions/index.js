/* eslint-disable no-undef */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// import { OpenAIAssistantRunnable } from "langchain/experimental/openai_assistant";
const { OpenAIAssistantRunnable } = require("langchain/experimental/openai_assistant");
const util = require("util")
const cors = require("cors")({ origin: true });


const { initializeApp } = require("firebase-admin/app");
initializeApp();

const { default: OpenAI } = require("openai");



async function _addTextMessageToAssistant(textMessage) {
    // console.log("textMessage", textMessage);
    // const thread = await openai.beta.threads.create();

    // const textMessage = "I need to solve the equation. Can you help me?"
    const { OpenAI: MSOpenAI } = require("openai");
    const openai = new MSOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const { getFirestore } = require("firebase-admin/firestore");
    const documentRef = getFirestore().collection("users").doc("dummy_user");
    const documentRaw = await documentRef.get();
    const documentData = documentRaw.data();

    let assistantId = documentData?.assistantId;
    let threadId = documentData?.threadId;
    console.log("assistantId", assistantId);
    console.log("threadId", threadId);



    const AddTaskSkill = require("./skills/Tasks/AddTaskSkill.js");
    const GetTasksSkill = require("./skills/Tasks/GetTasksSkill.js");
    const DeleteTaskSkill = require("./skills/Tasks/DeleteTaskSkill.js");
    const EditTaskSkill = require("./skills/Tasks/EditTaskSkill.js");

    // Handle result of the skill
    const functional_tools = [
        new AddTaskSkill(),
        new GetTasksSkill(),
        new DeleteTaskSkill(),
        new EditTaskSkill(),
    ];

    let openAIAssistant = null;
    if (!assistantId) {
        openAIAssistant = await OpenAIAssistantRunnable.createAssistant({
            name: "Personal paid pendant",
            instructions: "You are personal paid helpfull assistant. Answer super concise until user asked for more information.",
            model: "gpt-4-1106-preview",
            // model: "gpt-4-0613",
            // model: "gpt-3.5-turbo-1106",
            pollIntervalMs: 500,
            language: "en",
            tools: functional_tools,
            asAgent: true,
            assistantId: "as_id_igor",
        });

        assistantId = openAIAssistant.assistantId;

        const { getFirestore } = require("firebase-admin/firestore");
        const documentRef = getFirestore().collection("users").doc("dummy_user");
        await documentRef.update({ "assistantId": assistantId, });


    } else {
        openAIAssistant = new OpenAIAssistantRunnable({
            assistantId: assistantId,
            asAgent: true,
            pollIntervalMs: 500,
        });
    }

    // const run = await openAIAssistant.invoke({
    //     content: textMessage,
    // });
    // console.log("run", run);

    const { AgentExecutor } = require("langchain/agents");

    const agentExecutor = AgentExecutor.fromAgentAndTools({
        agent: openAIAssistant,
        tools: functional_tools,
        verbose: true,
        returnIntermediateSteps: true,
    });

    let agentResponse = null
    if (!threadId) {
        const thread = await openai.beta.threads.create();
        console.log("thread", thread);
        threadId = thread.id;

        const { getFirestore } = require("firebase-admin/firestore");
        const documentRef = getFirestore().collection("users").doc("dummy_user");
        await documentRef.update({ "threadId": threadId, });

        // agentResponse = await agentExecutor.invoke({
        //     content: textMessage,
        // });
        // console.log(agentResponse)
        // threadId = agentResponse?.threadId;
        // console.log("threadId", threadId);
    }

    agentResponse = await agentExecutor.invoke({
        // threadId: "thread_NrXKa7MNbqGMKPMOEOrvv2cK",
        threadId: threadId,
        content: textMessage,
    });

    console.log("agentExecutor", agentExecutor.agent.runnable)

    const responseText = agentResponse?.output;
    // console.log("agentResponse", agentResponse);

    // const mp3Response = await openai.audio.speech.create({
    //     model: "tts-1",
    //     voice: "alloy",
    //     input: responseText,
    //     response_format: "flac",
    //     language: "en",
    // });

    // const buffer = await mp3Response.arrayBuffer();
    // const base64Audio = Buffer.from(buffer).toString("base64");
    // console.log(responseText);
    return {
        // base64Audio: base64Audio, 
        responseText: responseText
    };
}


exports.webaddtextmessagetoassistant = functions.runWith({
    timeoutSeconds: 60
}).https.onRequest(async (req, res) => {
    cors(req, res, async () => {

        const textMessage = req.body.textMessage;

        const { base64Audio, responseText } = await _addTextMessageToAssistant(textMessage)
        console.log("responseText before ret", responseText);
        res.json({ "base64": base64Audio, responseText });
    });
    return;
});

exports.openaddtextmessagetoassistant1 = functions.runWith({
    timeoutSeconds: 60
}).https.onRequest(async (req, res) => {
    const textMessage = req.body.textMessage;
    const { base64Audio, responseText } = await _addTextMessageToAssistant(textMessage)

    res.status(200).json({ "base64": base64Audio, "responseText": responseText })

    console.log("req" + req?.body?.foo + " " + req?.body);
});

exports.listmessages = onCall(async (request) => {
    const openai = new OpenAI(process.env.OPENAI_API_KEY)

    const { getFirestore } = require("firebase-admin/firestore");
    const documentRef = getFirestore().collection("users").doc("dummy_user");
    const documentRaw = await documentRef.get();
    const documentData = documentRaw.data();

    const assistantId = documentData?.assistantId;
    const threadId = documentData?.threadId;
    console.log("assistantId", assistantId);
    console.log("threadId", threadId);

    const threadMessages = await openai.beta.threads.messages.list(
        threadId
    );

    threadMessages.data.forEach((message) => {
        console.log(message.content[0].text.value);
    })

    console.log(threadMessages);


    return threadMessages.data



});
