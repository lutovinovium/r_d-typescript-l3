export enum Status {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done"
}

export enum Priority {
    LOW= "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export type Task = {
    id: string;
    title: string;
    description?: string;
    createdAt: Date | string;
    status?: Status;
    priority?: Priority;
    deadline?: Date | string;
    doneAt?: Date | string;
}

export type TTaskValidators =  {
    [key: string]: (value: unknown) => boolean | undefined
}

export type TaskParserOutput =  | {result: Task, error?: never} | {result?: never, error: unknown};

export type DateFormatterArgType = Date | string | undefined;
export type EnumFormatterArgType = string | undefined;
export type TextFormatterArgType = string | number | undefined;
export type UpdateTaskPayload = Partial<Omit<Task, 'id' | 'createdAt'>>;
