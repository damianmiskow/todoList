//Load and save data
let todoList;
loadList();
function loadList() {
    todoList = JSON.parse(localStorage.getItem('myToDoList'))

if (!todoList) {
    todoList = [{
        name: 'task 123',
        date: '12/56/12',
        id: 1
    }, {
        name: 'task 1234',
        date: '12/56/12',
        id: 2
    }, 
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
            <button class = "delete-button" data-task-id="${task.id}">Delete</button >
        </div>
        <div class = "tableElement">Edit #4</div>
    </div>`
    }) 
    document.querySelector('.toDoList').innerHTML = HTML;

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
}


//Functionality
    //Addto Cart
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
    })
    console.log(todoList)



//Start the page
todoListHTML();
