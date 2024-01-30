/* eslint-disable quotes */
const z = require("zod");
const { StructuredTool } = require("langchain/tools");

class GetTasksSkill extends StructuredTool {
    schema = z.object({
    });

    name = "get_todays_tasks";

    description = "List all the tasks for today in JSON format.";

    constructor() {
        super(...arguments);
    }

    async _call(input) {
        console.log("=== GetTasksSkill", input);

        const { getFirestore } = require("firebase-admin/firestore");

        const documentRef = getFirestore().collection("users").doc("dummy_user").collection("dailyObjects").doc("dummy_date");
        const documentRaw = await documentRef.get();
        const documentData = documentRaw.data();

        const tasks = documentData.tasks;

        //Array to JSON string
        const tasksString = JSON.stringify(tasks);

        // const result = ["Change pin code", "Fix bug with todo app", "Done"];
        return tasksString;
    }
}

module.exports = GetTasksSkill;