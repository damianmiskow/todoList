import { getTask, loadList } from "../data/task-data.js";

loadList();

const queryString = window.location.search; //saves the query string from the url
const queryParams = new URLSearchParams(queryString); //saves the params
const taskId = queryParams.get('id'); //get id param
const currentTask = getTask(Number(taskId)); 


document.querySelector('.js-task-name').innerHTML = `Task Name: ${currentTask.name}`;
document.querySelector('.js-task-details').innerHTML = `Task Details: ${currentTask.details}`