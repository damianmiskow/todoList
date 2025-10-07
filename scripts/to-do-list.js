import {todoList, loadList, saveList, setEditedTask, getEditedTask} from "../data/task-data.js";
import {getRandomID} from '../scripts/utils/utils.js'

loadList();
todoListHTML();

//GENERATING HTML
export function todoListHTML() {
    let HTML = '';
    todoList.forEach((task) => {
        HTML += `<div class = "toDoListRow">
        <div class = "tableElement">
            <a href ="task-details.html?id=${task.id}">${task.name}</a>
        </div>
        <div class = "tableElement">${task.date}</div>
        <div class = "tableElement">
            <button class = "delete-button" data-task-id="${task.id}">Delete</button>
        </div>
        <div class = "tableElement">
            <button class = "edit-button" data-task-id="${task.id}">Edit</button>
        </div>
    </div>`
    }) 
    document.querySelector('.toDoList').innerHTML = HTML;
    //Add button handles
    deleteTaskHandles()
    editTasksHandles()

}

function deleteTaskHandles() {
    document.querySelectorAll('.delete-button').forEach((button) =>
    button.addEventListener('click', () => {
        const taskIdToRemove = Number(button.dataset.taskId);
        const index = todoList.findIndex(task => task.id === taskIdToRemove);
        if (index !== -1) {
            todoList.splice(index, 1)
        }
        saveList()
        todoListHTML()
    })
)};


//Edit task handles

function editTasksHandles() {
    document.querySelectorAll('.edit-button').forEach((button) =>
    button.addEventListener('click', () => {
        const taskId = Number(button.dataset.taskId); //gets task id
        todoList.forEach((task) => { //find the task
            if (taskId === task.id) {
                setEditedTask(task);
            }
        });

        const editedTask = getEditedTask();
        document.querySelector(".js-name-input").value = editedTask.name; //load current name
        document.querySelector(".js-date-input").value = editedTask.date; //load current date
        document.querySelector(".task-details-input").value = editedTask.details; //load current details
        document.querySelector(".js-saveButton").classList.remove("button-hide") //show save button
        document.querySelector(".js-taskAddButton").classList.add("button-hide")//hide add button

    }
    ))
}



//Save edits
document.querySelector(".js-saveButton").addEventListener("click", () => { 
    const currentTask = getEditedTask();
    if (!currentTask) { //adds function to the save button
        return;
    }
    currentTask.name = document.querySelector(".js-name-input").value; //saves new value for name
    currentTask.date = document.querySelector(".js-date-input").value; //saves new value for date
    currentTask.details = document.querySelector('.js-task-details-input').value;
    document.querySelector(".js-name-input").value = ""; //clears values for name
    document.querySelector(".js-date-input").value = ""; //clears values for date
    document.querySelector(".js-task-details-input").value = ""; //clears values for details
    saveList()
    todoListHTML()  

    document.querySelector(".js-saveButton").classList.add("button-hide")  //hides save button
    document.querySelector(".js-taskAddButton").classList.remove("button-hide") //show add button
    setEditedTask(null);
})

//Add new task
document.querySelector('.js-taskAddButton').addEventListener("click", () => {
    const taskName = document.querySelector('.js-name-input').value;
    const taskDate = document.querySelector('.js-date-input').value;
    const taskDetails = document.querySelector('.js-task-details-input').value;
    todoList.push({
        name: taskName,
        date: taskDate,
        id: getRandomID(),
        details: taskDetails
    });
    todoListHTML()
    saveList()
    document.querySelector('.js-name-input').value = "" //clear values
    document.querySelector('.js-date-input').value = ""
    document.querySelector('.js-task-details-input').value = ""
    console.log(document.querySelector('.js-task-details-input').value)
    console.log(todoList)
});

document.querySelector(".js-attach-files").addEventListener("click", () => {
    document.querySelector(".js-file-input").click();
})