//Load and save data
let todoList;
let editedTask = null;
loadList();
function loadList() {
    todoList = JSON.parse(localStorage.getItem('myToDoList'))

if (!todoList) {
    todoList = [{
        name: 'task 123',
        date: '2025-10-01',
        id: 1
    }, {
        name: 'task 1234',
        date: '2025-10-15',
        id: 2
    } 
    ]
}
}

function saveList() {
    localStorage.setItem('myToDoList', JSON.stringify(todoList))
}


//Move to utils later
//Random number generator
function getRandomID() {
    const min = 10000
    const max = 99999
    return Math.floor(Math.random() * (max-min + 1) + min);
}

console.log(getRandomID())




//Generating HTML
function todoListHTML() {
    let HTML = '';
    todoList.forEach((task) => {
        HTML += `<div class = "toDoListRow"">
        <div class = "tableElement">${task.name}</div>
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


    //delete button functionality
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
    }
    )
)

    //edit button functionality
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
        document.querySelector(".js-saveButton").classList.remove("save-button-hide") //show save button

    }
    ))
}

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

    document.querySelector(".js-saveButton").classList.add("save-button-hide")  //hides save button
    editedTask = null;

})



//Functionality
    //Add to Cart
document.querySelector('.js-taskAddButton').addEventListener("click", () => {
    const taskName = document.querySelector('.js-name-input').value;
    const taskDate = document.querySelector('.js-date-input').value;
    todoList.push({
        name: taskName,
        date: taskDate,
        id: getRandomID(),
    });
    todoListHTML()
    saveList()
    document.querySelector('.js-name-input').value = ""
    document.querySelector('.js-date-input').value = ""
});

//Start the page
todoListHTML();
