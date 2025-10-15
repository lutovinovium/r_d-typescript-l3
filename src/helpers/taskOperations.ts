import {
    DateFormatterArgType,
    EnumFormatterArgType,
    Task,
    TextFormatterArgType,
    UpdateTaskPayload
} from "../dto/Task";
import {parseTask} from "./taskParsers";

const dateFormatter = (value: DateFormatterArgType) => {
    if (!value) return '';
    return new Date(value).toLocaleDateString();
};
const textFormatter = (value: TextFormatterArgType) => {
    if (!value) return '';
    return value.toString(10);
};
const enumFormatter = (value: EnumFormatterArgType) => {
    if (!value) return ''
    return value.charAt(0).toUpperCase() + value.substring(1).replace('_', ' ').toLowerCase()
}

const displayTaskDetail = <K extends keyof Task>(key: K, value: Task[K]) => {
    switch (key) {
        case "createdAt":
        case "doneAt":
        case "deadline":
            return dateFormatter(value as DateFormatterArgType);
        case "priority":
        case "status":
            return enumFormatter(value as EnumFormatterArgType);
        default:
            return textFormatter(value as TextFormatterArgType);
    }
}

export const getTaskDetails = (tasks: Task[], taskId: Task["id"]) => {
    const foundTask = tasks.find(task => taskId === task.id);
    if (foundTask) {
        for (const _key in foundTask) {
            const key = _key as keyof Task;
            const value = foundTask[key];
            let displayedKey = `${key.toUpperCase()}:`;
            const tabulations = `${displayedKey.length > 8 ? '' : '\t'}\t\t`;
            const displayValue = displayTaskDetail(key, value)
            console.log(`${displayedKey}${tabulations}${displayValue}`)

        }
        console.log('==========================================\n');
    } else {
        console.log(`Task with given id ${taskId} was not found`);
    }
}

export const createTask = (tasks: Task[], task: unknown): Task[] => {
    const {result, error} = parseTask(task);
    if (result) {
        const foundTask = tasks.find(task => result.id === task.id);
        if (!foundTask) {
            return [...tasks, result]

        } else {
            console.error(`Task with id ${foundTask.id} already exists.`);
        }
    } else {
        console.error(error);
    }
    return tasks;
}

export const updateTaskDetails = (tasks: Task[], taskId: Task["id"], details: UpdateTaskPayload) => {
    const foundTaskIndex = tasks.findIndex(task => taskId === task.id);
    if (foundTaskIndex === -1) {
        console.error(`Task with given id ${taskId} was not found`);
        return tasks
    }
    const newTask = {...tasks[foundTaskIndex]!, ...details};
    return tasks.map((task, i) => i === foundTaskIndex ? newTask : task)
};

export const removeTask = (tasks: Task[], taskId: Task['id']) => {
    return tasks.filter(task => task.id !== taskId)
}

export const filterTasks = (tasks: Task[], filter: Partial<Task>) => {
    return tasks.filter(task => {
        return Object.entries(filter).every(([_filterKey, filterValue]) => {
            const filterKey = _filterKey as keyof Task;
            return task[filterKey] === filterValue
        })
    })
};

export const isDoneInTime = (task: Task) => {
    if (!task.doneAt) {
        console.error('Task have not been done yet');
        return null;
    }
    if (!task.deadline) {
        console.error('Task does not have deadline specified');
        return null
    }

    return new Date(task.deadline) > new Date(task.doneAt)
}
