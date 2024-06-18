const todoInputElem = document.querySelector('.todo-input')
const todoAddElem = document.querySelector('.add-btn')
const todoListElem = document.querySelector('.todo-list')
let todoList = []
let id = 0

const appendToDo = (text) => {
  const newID = id++
  const newToDoList = [...getToDoList(), { id: newID, isCompleted: false, content: text }]
  setToDoList(newToDoList)
  createToDoList()
}

const setToDoList = (newToDoList) => {
  todoList = newToDoList
}

const getToDoList = () => {
  return todoList
}

const completeToDo = (todoID) => {
  const newToDoList = getToDoList().map((todo) =>
    todo.id === todoID ? { ...todo, isCompleted: !todo.isCompleted } : todo
  )
  setToDoList(newToDoList)
  createToDoList()
}

const deleteToDo = (todoID) => {
  const newToDoList = getToDoList().filter((todo) => todo.id !== todoID)
  setToDoList(newToDoList)
  createToDoList()
}

const createToDoList = () => {
  todoListElem.innerHTML = ''

  const todoList = getToDoList()

  const itemsLeft = todoList.filter((todo) => !todo.isCompleted).length
  // // 완료되지 않은 할 일의 수를 화면에 표시
  document.querySelector('.todo-left').textContent = `해야 할 일: ${itemsLeft}`

  todoList.forEach((todo) => {
    // list요소 생성
    const todoItemElem = document.createElement('li')
    todoItemElem.classList.add('todo-item')
    todoItemElem.setAttribute('data-id', todo.id)

    // 체크리스트 요소
    const todoCheckElem = document.createElement('input')
    todoCheckElem.type = 'checkbox'
    todoCheckElem.classList.add('todo-check')
    todoCheckElem.addEventListener('click', () => completeToDo(todo.id))

    if (todo.isCompleted) {
      todoItemElem.classList.add('checked')
      todoCheckElem.checked = true
    }

    // 내용 요소
    const todoContentElem = document.createElement('div')
    todoContentElem.classList.add('todo-content')
    todoContentElem.innerText = todo.content

    // 삭제
    const todoDeleteElem = document.createElement('button')
    todoDeleteElem.classList.add('del-btn')
    todoDeleteElem.addEventListener('click', () => deleteToDo(todo.id))
    todoDeleteElem.innerText = 'X'

    todoItemElem.appendChild(todoCheckElem)
    todoItemElem.appendChild(todoContentElem)
    todoItemElem.appendChild(todoDeleteElem)

    todoListElem.appendChild(todoItemElem)
  })
}

const init = () => {
  todoInputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInputElem.value.trim() !== '') {
      console.log(todoInputElem.value)
      appendToDo(todoInputElem.value)
      todoInputElem.value = ''
    }
  })

  todoAddElem.addEventListener('click', () => {
    if (todoInputElem.value.trim() != '') {
      console.log(todoInputElem.value)
      appendToDo(todoInputElem.value)

      todoInputElem.value = ''
    }
  })
}

init()
