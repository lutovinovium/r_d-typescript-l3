import {Priority, Status, Task, TTaskValidators} from "../dto/Task";

export const taskValidators: TTaskValidators =  {
    id: (value: unknown) => typeof value === 'string' || typeof value === 'number',
    title: (value: unknown) => typeof value === 'string',
    createdAt: (value: unknown) => typeof value === 'string' || value instanceof Date,
    description: (value: unknown) => typeof value === 'string' || value === undefined,
    status: (value: unknown) => Object.values(Status).some(key => key === value)|| value === undefined,
    priority: (value: unknown) => Object.values(Priority).some(key => key === value)|| value === undefined,
    deadline: (value: unknown) => typeof value === 'string' || value instanceof Date|| value === undefined,
    doneAt: (value: unknown) => typeof value === 'string' || value instanceof Date|| value === undefined,
};

export const isIterableKeysObject = (value: unknown): value is { [key: string]: unknown } => {
    return !!value && typeof value === 'object';
};

export const isTask = (value: unknown): value is Task => {
    if (!isIterableKeysObject(value)) {
        return false;
    }
    const allKeys = new Set(Object.keys(value).concat(Object.keys(taskValidators)));
    return Array.from(allKeys).every((key) => taskValidators[key]?.(value[key]));
}