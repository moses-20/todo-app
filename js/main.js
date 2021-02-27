// variables
const todoInput = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn')
const errorMsg = document.querySelector('#error-msg')
const todoList = document.querySelector('ul')

// function to add new todo item
const addTodo = () => {
    if (todoInput.value == '') {
        errorMsg.classList.remove('hide')
        errorMsg.classList.add('error')
    } else {
        errorMsg.classList.remove('error')
        errorMsg.classList.add('hide')
        informText(1)
        setTodo(todoInput.value)
    }
}

// event handlers
addBtn.addEventListener('click', addTodo)

todoInput.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') addTodo()
})


todoList.addEventListener('click', (e) => {

    let target = e.target
    let item = target.parentElement.parentElement
    let itemID = item.id

    if (target.innerText === 'Edit') {
        editTodo(item, itemID)

    } else if (target.innerText === 'Save') {
        updateTodo(item, itemID)

    } else if (target.innerText === 'Delete') {
        informText(-1)
        todoList.removeChild(item)
    }
})

// text function to count todo items
const informText = (j) => {
    let infoMsg = todoList.querySelector('h2')
    let listNo = todoList.querySelectorAll('li').length + (j)

    // *** my intentional use of ternary operator ***
    listNo < 1 ?
        infoMsg.innerText = 'Nothing to do'
        : listNo == 1 ?
            infoMsg.innerText = 'Just one thing to do!'
            : infoMsg.innerText = `You have ${listNo} things to do`
}

// set todo html
const setTodo = (task) => {
    let html =
        `<li>
            <div class="todo">
                <p>${task}</p>
                <input type="text" class="hide"/>
            </div>
            <div class="btns">
                <button> Edit </button>
                <button class="save hide"> Save </button>
                <button> Delete </button>
            </div>
        </li>`

    todoList.innerHTML += html
    todoInput.value = ''

    // adding a unique id to every list
    let listItems = todoList.children

    for (let i = 0; i <= listItems.length - 1; i++) {
        listItems[i].setAttribute('id', i)
    }
}


// edit todo function
const editTodo = (el, id) => {
    let taskItem = el.querySelector('p')
    let newInput = el.querySelector('input[type=text]')
    let edBtn = el.querySelectorAll('button')[0]
    let saveBtn = el.querySelectorAll('button')[1]
    let delBtn = el.querySelectorAll('button')[2]

    if (taskItem.closest('li').id === id) {

        newInput.value = taskItem.innerText

        taskItem.classList.add('hide')
        newInput.classList.remove('hide')
        newInput.classList.add('edit-mode')
        edBtn.classList.add('hide')
        delBtn.classList.add('hide')
        saveBtn.classList.remove('hide')

        saveBtn.addEventListener('click', () => updateTodo(el, id))

        newInput.addEventListener('keypress', (e) => {
            if (e.key == 'Enter') updateTodo(el, id)
        })
    }
}


// update todo function
const updateTodo = (el, id) => {
    let taskItem = el.querySelector('p')
    let newInput = el.querySelector('input[type=text]')
    let edBtn = el.querySelectorAll('button')[0]
    let saveBtn = el.querySelectorAll('button')[1]
    let delBtn = el.querySelectorAll('button')[2]

    if (taskItem.closest('li').id === id) {
        taskItem.innerText = newInput.value

        newInput.classList.remove('edit-mode')
        newInput.classList.add('hide')
        taskItem.classList.remove('hide')
        edBtn.classList.remove('hide')
        edBtn.classList.add('edit')
        delBtn.classList.remove('hide')
        delBtn.classList.add('delete')
        saveBtn.classList.add('hide')
    }
}