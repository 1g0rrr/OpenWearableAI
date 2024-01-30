/* eslint-disable quotes */
const z = require("zod");
const { StructuredTool } = require("langchain/tools");

class DoneTaskSkill extends StructuredTool {
    schema = z.object({
        taskId: z.string().describe("Id of the task that collected from the task in UUID format"),
        isDone: z.boolean().describe("Is task done?").default(true),
    });

    name = "done_task";

    description = "Mark task as Done by id.";

    constructor() {
        super(...arguments);
    }

    async _call(input) {
        console.log("=== DoneTaskSkill", input);

        const { getFirestore } = require("firebase-admin/firestore");

        const { taskId } = input;

        const documentRef = getFirestore().collection("users").doc("dummy_user").collection("dailyObjects").doc("dummy_date");

        // Delete the field
        await documentRef.update({
            [`tasks.${taskId}.is_completed`]: input.isDone,
        }).catch((error) => {
            console.log("Error deleting task", error);
        });

        return "Done";
    }
}

module.exports = DoneTaskSkill;