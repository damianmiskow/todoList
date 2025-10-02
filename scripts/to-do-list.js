import { getRandomID } from "./utils/utils.js";


//DATA
let todoList;
let editedTask = null;
loadList();
function loadList() {
    todoList = JSON.parse(localStorage.getItem('myToDoList'))

if (!todoList) {
    todoList = [{
        name: 'task 123',
        date: '2025-10-01',
        id: 1,
        details: '123'
    }, {
        name: 'task 1234',
        date: '2025-10-15',
        id: 2,
        details: ''
    } 
    ]
}
}

function saveList() {    //Save to storage
    localStorage.setItem('myToDoList', JSON.stringify(todoList))
}

//GENERATING HTML
function todoListHTML() {
    let HTML = '';
    todoList.forEach((task) => {
        HTML += `<div class = "toDoListRow">
        <div class = "tableElement">
            <a href ="task-details.html?id=${task.id}" target="_blank">${task.name}</a>
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


//EVENT HANDLES

//Delete task
function deleteTaskHandles() {
    document.querySelectorAll('.delete-button').forEach((button) =>
    button.addEventListener('click', () => {
        const taskIdToRemove = Number(button.dataset.taskId);
        let newTodoList = [];
        todoList.forEach((task) => {
            if (task.id !== taskIdToRemove) {
                newTodoList.push(task);
            }
        })
        todoList = newTodoList;
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
                editedTask = task;
            }
        });

        document.querySelector(".js-name-input").value = editedTask.name; //load current name
        document.querySelector(".js-date-input").value = editedTask.date; //load current date
        document.querySelector(".js-saveButton").classList.remove("button-hide") //show save button
        document.querySelector(".js-taskAddButton").classList.add("button-hide")//hide add button

    }
    ))
}



//Save edits
document.querySelector(".js-saveButton").addEventListener("click", () => {     //adds function to the save button
    if (!editedTask) {
        return;
    }
    editedTask.name = document.querySelector(".js-name-input").value; //saves new value for name
    editedTask.date = document.querySelector(".js-date-input").value; //saves new value for date
    document.querySelector(".js-name-input").value = ""; //clears values for name
    document.querySelector(".js-date-input").value = ""; //clears values for date
    saveList()
    todoListHTML()  

    document.querySelector(".js-saveButton").classList.add("button-hide")  //hides save button
    document.querySelector(".js-taskAddButton").classList.remove("button-hide") //show add button
    editedTask = null;

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
    document.querySelector('.js-date-input').value = ""
    console.log(document.querySelector('.js-task-details-input').value)
    console.log(todoList)
});


//Start the page
todoListHTML();
loadList();
