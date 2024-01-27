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
        this._callback = params.callback
    }

    async _call(input) {
        if (this._callback) {
            this._callback(input)
        }
        const result = "Done";
        return result;
    }
}

module.exports = AddTaskSkill;