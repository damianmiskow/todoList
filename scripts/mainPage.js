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

todoListHTML();
console.log(todoList)