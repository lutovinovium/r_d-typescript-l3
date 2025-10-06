import fs from "fs";
import {Priority, Status, Task, TTaskValidators} from "../dto/Task";
import {DEFAULT_PRIORITY, DEFAULT_STATUS} from "../constants";

const taskValidators: TTaskValidators =  {
    id: (value: unknown) => typeof value === 'string' || typeof value === 'number',
    title: (value: unknown) => typeof value === 'string',
    createdAt: (value: unknown) => typeof value === 'string' || value instanceof Date,
    description: (value: unknown) => typeof value === 'string' || value === undefined,
    status: (value: unknown) => Object.values(Status).some(key => key === value)|| value === undefined,
    priority: (value: unknown) => Object.values(Priority).some(key => key === value)|| value === undefined,
    deadline: (value: unknown) => typeof value === 'string' || value instanceof Date|| value === undefined,
    doneAt: (value: unknown) => typeof value === 'string' || value instanceof Date|| value === undefined,
};

const isIterableKeysObject = (value: unknown): value is { [key: string]: unknown } => {
    return !!value && typeof value === 'object';
};

const isTask = (value: unknown): value is Task => {
    if (!isIterableKeysObject(value)) {
        return false;
    }
    const allKeys = new Set(Object.keys(value).concat(Object.keys(taskValidators)));
    return Array.from(allKeys).every((key) => taskValidators[key]?.(value[key]));
}

const setDefaultValues = (task: Task): Task => {
    if (task.status === undefined) {
        task['status'] = DEFAULT_STATUS;
    }
    if (task.priority === undefined) {
        task['priority'] = DEFAULT_PRIORITY;
    }

    return task;
};

export const parseTask = (task: unknown): | {success: Task, error?: never} | {success?: never, error: unknown} => {
    if (isTask(task)) {
        return {success: setDefaultValues(task) }
    } else {
        return {error: task}
    }
}

export const parseTasks = (tasks: unknown[]) => {
    let successfullyParsedTasks: Task[] = [];
    let parseErrors: unknown[] = [];

    tasks.forEach(task => {
        const {success, error} = parseTask(task);
        if (success) {
            successfullyParsedTasks.push(success);
        } else {
            parseErrors.push(error)
        }
    })
    console.log(`Successfully parsed ${successfullyParsedTasks.length} task(s). Failed to parse ${parseErrors.length} task(s).`);

    return successfullyParsedTasks;
}

