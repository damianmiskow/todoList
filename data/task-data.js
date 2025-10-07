let todoList = [];
let editedTask = null;

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
        } ,
        ];
    }
}
function saveList() {    //Save to storage
    localStorage.setItem('myToDoList', JSON.stringify(todoList))
}

function setEditedTask(task) { //set a task to be edited
    editedTask = task;
}

function getEditedTask() { //sends data about the task about to be edited
    return editedTask;
}


function getTask(id) { //get task
    let foundTask;
    todoList.forEach((task) => {
        if (task.id === id) {
            foundTask = task;
        }
    });
    return foundTask
}




export {todoList, loadList, saveList, setEditedTask, getEditedTask, getTask}