//Load and save data
let todoList;
loadList();
function loadList() {
    todoList = JSON.parse(localStorage.getItem('myToDoList'))

if (!todoList) {
    todoList = [{
        name: 'task 123',
        date: '12/56/12',
        id: ''
    }, {
        name: 'task 1234',
        date: '12/56/12',
        id: ''
    }, 
    ]
}
}

function saveList() {
    localStorage.setItem('myToDoList', JSON.stringify(todoList))
}




//Generating HTML
function todoListHTML() {
    let HTML = '';
    todoList.forEach((item) => {
        HTML += `<div class = "toDoListRow">
        <div class = "tableElement">${item.name}</div>
        <div class = "tableElement">${item.date}</div>
        <div class = "tableElement">Remove #3</div>
        <div class = "tableElement">Edit #4</div>
    </div>`
    }) 
    document.querySelector('.toDoList').innerHTML = HTML;
}

//Functionality

    //Addto Cart
    document.querySelector('.js-taskAddButton').addEventListener("click", () => {
        const taskName = document.querySelector('.js-name-input').value;
        const taskDate = document.querySelector('.js-date-input').value;
        todoList.push({
            name: taskName,
            date: taskDate,
        });
        todoListHTML()
        saveList()
    })





todoListHTML();