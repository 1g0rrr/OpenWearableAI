const z = require("zod");
const { StructuredTool } = require("langchain/tools");

class AddTaskSkill extends StructuredTool {
    schema = z.object({
        start_time: z.string().describe("Time for starting the event or task in format HH:MM").optional(),
        title: z.string().describe("Title of the event or task"),
    });

    name = "add_task_event";

    description = "Set event or task in my daily tasks.";

    _callback = null

    constructor(params) {
        super(...arguments);
    }

    async _call(input) {
        const { start_time, title } = input;

        const { getFirestore } = require("firebase-admin/firestore");

        const documentRef = getFirestore().collection("users").doc("dummy_user").collection("dailyObjects").doc("dummy_date");
        // const documentRaw = await documentRef.get();
        // const documentData = documentRaw.data();
        const { v4: uuidv4 } = require("uuid");

        const itemId = uuidv4();
        await documentRef.update({
            [`tasks.${itemId}.id`]: itemId,
            [`tasks.${itemId}.title`]: title,
            [`tasks.${itemId}.is_completed`]: false,
            [`tasks.${itemId}.start_time_string`]: start_time ? start_time : "",
        });

        const result = "Done";
        return result;
    }
}

module.exports = AddTaskSkill;