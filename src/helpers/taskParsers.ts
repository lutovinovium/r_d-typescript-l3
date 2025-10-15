import {Task, TaskParserOutput} from "../dto/Task";
import {DEFAULT_PRIORITY, DEFAULT_STATUS} from "../constants";
import {isTask} from "./validateTasks";


const setDefaultValues = (task: Task): Task => {
    if (task.status === undefined) {
        task['status'] = DEFAULT_STATUS;
    }
    if (task.priority === undefined) {
        task['priority'] = DEFAULT_PRIORITY;
    }

    return task;
};

export const parseTask = (task: unknown): TaskParserOutput => {
    if (isTask(task)) {
        return {result: setDefaultValues(task) }
    } else {
        return {error: `Error parsing ${task}}`}
    }
}

export const parseTasks = (tasks: unknown[]) => {
    let successfullyParsedTasks: Task[] = [];
    let parseErrors: unknown[] = [];

    tasks.forEach(task => {
        const {result, error} = parseTask(task);
        if (result) {
            successfullyParsedTasks.push(result);
        } else {
            parseErrors.push(error)
        }
    })
    console.log(`Successfully parsed ${successfullyParsedTasks.length} task(s). Failed to parse ${parseErrors.length} task(s).`);

    return successfullyParsedTasks;
}

