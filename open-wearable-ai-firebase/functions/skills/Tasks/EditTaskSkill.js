/* eslint-disable quotes */
const z = require("zod");
const { StructuredTool } = require("langchain/tools");

class EditTaskSkill extends StructuredTool {
    schema = z.object({
        taskId: z.string().describe("Id of the task in UUID format"),
        start_time: z.string().describe("Time for starting the event or task in format HH:MM"),
        title: z.string().describe("Title of the event or task"),
        isDone: z.boolean().describe("Is task done?").default(true),
    });

    name = "done_task";

    description = "Edit task by id.";

    constructor() {
        super(...arguments);
    }

    async _call(input) {
        console.log("=== EditTaskSkill", input);

        const { getFirestore } = require("firebase-admin/firestore");

        const { taskId, start_time, title, isDone, } = input;

        const documentRef = getFirestore().collection("users").doc("dummy_user").collection("dailyObjects").doc("dummy_date");
        const documentRaw = await documentRef.get();
        const documentData = documentRaw.data();

        // Delete the field
        await documentRef.update({
            [`tasks.${taskId}.start_time_string`]: start_time ? start_time : "",
            [`tasks.${taskId}.title`]: input.title,
            [`tasks.${taskId}.is_completed`]: input.isDone,
        }).catch((error) => {
            console.log("Error deleting task", error);
        });

        return "Done";
    }
}

module.exports = EditTaskSkill;