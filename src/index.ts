import {parseTasks} from "./helpers/taskParsers";
import {
    createTask,
    filterTasks,
    getTaskDetails,
    isDoneInTime,
    removeTask,
    updateTaskDetails
} from "./helpers/taskOperations";
import {Priority, Status} from "./dto/Task";
import fs from "fs";

export const readTasks =  () => {
    const file = fs.readFileSync(`${__dirname}/tasks.json`, 'utf8');
    return parseTasks(JSON.parse(file));
}

let tasks = readTasks();

getTaskDetails(tasks, 565);                     //not found
getTaskDetails(tasks, 905);                     //found, id as number
getTaskDetails(tasks, 'T-1010');                //found, string

tasks = createTask(tasks, {wrong: 'field'});      // error, wrong format
tasks = createTask(tasks, undefined);             // error, wrong type
tasks = createTask(tasks, {                       //error, wrong ID
    id: 905,
    title: "Створити звіт",
    description: "Підготувати щомісячний звіт для керівництва.",
    createdAt: "2025-10-01T09:00:00Z",
    status: "in_progress",
    priority: "high",
    deadline: "2025-10-15T17:00:00Z",
})

tasks = updateTaskDetails(tasks, 905, {status: Status.IN_PROGRESS});
getTaskDetails(tasks, 905);                       //found, task now in progress

tasks = removeTask(tasks, 905);
getTaskDetails(tasks, 905);                       //task disappeared

const filteredTasksByDone = filterTasks(tasks,{status: Status.DONE});
console.log(filteredTasksByDone);

console.log('=============================');

const filteredTasksByTwoFactors = filterTasks(tasks,{status: Status.DONE, priority: Priority.LOW});
console.log(filteredTasksByTwoFactors);

filteredTasksByDone.forEach(task => console.log(`Task ${task.id} ${isDoneInTime(task) ? 'have been done in time' : 'have not been done in time'}`));

console.log("\x1b[38;2;255;0;0mT\x1b[38;2;255;165;0mh\x1b[38;2;255;255;0ma\x1b[38;2;127;255;0mn\x1b[38;2;0;255;0mk\x1b[38;2;0;255;255m \x1b[38;2;255;0;0my\x1b[38;2;255;165;0mo\x1b[38;2;255;255;0mu\x1b[38;2;127;255;0m \x1b[38;2;0;255;0mf\x1b[38;2;0;255;255mo\x1b[38;2;255;0;0mr\x1b[38;2;255;165;0m \x1b[38;2;255;255;0my\x1b[38;2;127;255;0mo\x1b[38;2;0;255;0mu\x1b[38;2;0;255;255mr\x1b[38;2;255;0;0m \x1b[38;2;255;165;0ma\x1b[38;2;255;255;0mt\x1b[38;2;127;255;0mt\x1b[38;2;0;255;0me\x1b[38;2;0;255;255mn\x1b[38;2;255;0;0mt\x1b[38;2;255;165;0mi\x1b[38;2;255;255;0mo\x1b[38;2;127;255;0mn\x1b[0m");