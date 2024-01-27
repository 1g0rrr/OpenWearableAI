/* eslint-disable quotes */
const z = require("zod");
const { StructuredTool } = require("langchain/tools");

class GetTodaysTasksSkill extends StructuredTool {
    schema = z.object({
    });

    name = "get_todays_tasks";

    description = "List all the tasks for today in one short message.";

    constructor() {
        super(...arguments);
    }

    async _call() {
        const tasks = [{
            id: '11',
            title: "Change pin code in my main doors",
            is_completed: false,
            start_time_string: '8:00',
            length_in_minutes: 30,
            isLocked: false,
        },
        {
            id: '22',
            title: 'Fix bug with todo app',
            is_completed: true,
            start_time_string: '15:00',
            length_in_minutes: 30,
            isLocked: false,
        },
        {
            id: '33',
            title: "Send invoice to Stasy",
            is_completed: false,
            // start_time_string: '15:00',
            // length_in_minutes: 30,
            isLocked: false,
        }
        ]

        // const result = ["Change pin code", "Fix bug with todo app", "Done"];
        return tasks;
    }
}

module.exports = GetTodaysTasksSkill;