/* eslint-disable quotes */
const z = require("zod");
const { StructuredTool } = require("langchain/tools");

class DeleteTaskSkill extends StructuredTool {
    schema = z.object({
        taskId: z.string().describe("Id of the task to delete in UUID format"),
    });

    name = "delete_task";

    description = "Delete task by id.";

    constructor() {
        super(...arguments);
    }

    async _call(input) {
        console.log("=== DeleteTaskSkill", input);

        const { getFirestore } = require("firebase-admin/firestore");
        const { FieldValue } = require("firebase-admin/firestore");

        const { taskId } = input;

        const documentRef = getFirestore().collection("users").doc("dummy_user").collection("dailyObjects").doc("dummy_date");

        // Delete the field
        await documentRef.update({
            [`tasks.${taskId}`]: FieldValue.delete()
        }).catch((error) => {
            console.log("Error deleting task", error);
        });

        return "Done";
    }
}

module.exports = DeleteTaskSkill;