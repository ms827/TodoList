const todoInputElem = document.querySelector('.todo-input')
const addToDoElem = document.querySelector('.add-btn')
const todoListElem = document.querySelector('.todo-list')

let todoList = []
let id = 0

const appendToDo = (text) => {
  const newID = id++
  const newToDoList = [...getAllToDoList(), { id: newID, isCompleted: false, content: text }]
  setToDoList(newToDoList)
  createToDoList()
}

const setToDoList = (newToDoList) => {
  todoList = newToDoList
}

const getAllToDoList = () => {
  return todoList
}

const completeToDo = (todoID) => {
  const newToDoList = getAllToDoList().map((todo) =>
    todo.id === todoID ? { ...todo, isCompleted: !todo.isCompleted } : todo
  )
  setToDoList(newToDoList)
  createToDoList()
}

const deleteToDo = (todoID) => {
  const newToDoList = getAllToDoList().filter((todo) => todo.id !== todoID)
  setToDoList(newToDoList)
  createToDoList()
}

const createToDoList = () => {
  todoListElem.innerHTML = ''
  const allToDoList = getAllToDoList() // todo list 배열 가져오기
  // 완료되지 않은 할 일의 개수 계산
  const itemsLeft = allToDoList.filter((todo) => !todo.isCompleted).length
  // 완료되지 않은 할 일의 개수를 표시하는 요소 찾기 및 업데이트
  document.getElementById('left-items-count').textContent = `해야 할 일: ${itemsLeft}`
  allToDoList.forEach((todo) => {
    const todoItemElem = document.createElement('li')
    todoItemElem.classList.add('todo-item')

    todoItemElem.setAttribute('data-id', todo.id)

    const checkboxElem = document.createElement('div')
    checkboxElem.classList.add('checkbox')
    checkboxElem.addEventListener('click', () => completeToDo(todo.id))
    console.log(todo.isCompleted)

    const todoElem = document.createElement('div')
    todoElem.classList.add('todo-content')
    todoElem.addEventListener('dblclick', (event) => editTodoContent(event, todo.id))
    todoElem.innerText = todo.content

    const deleteElem = document.createElement('button')
    deleteElem.classList.add('del-btn')
    deleteElem.addEventListener('click', () => deleteToDo(todo.id))
    deleteElem.innerText = 'X'

    if (todo.isCompleted) {
      todoItemElem.classList.add('checked')
      checkboxElem.innerText = '✔'
    }

    todoItemElem.appendChild(checkboxElem)
    todoItemElem.appendChild(todoElem)
    todoItemElem.appendChild(deleteElem)

    todoListElem.appendChild(todoItemElem)
  })
}

const updateTodo = (text, todoId) => {
  const currentToDoList = getAllToDoList()
  const newToDoList = currentToDoList.map((todo) => (todo.id === todoId ? { ...todo, content: text } : todo))
  setToDoList(newToDoList)
  createToDoList()
}

const editTodoContent = (e, todoId) => {
  const todoElem = e.target
  const inputText = e.target.innerText
  const todoItemElem = todoElem.parentNode
  const inputElem = document.createElement('input')
  inputElem.value = inputText
  inputElem.classList.add('edit-input')
  inputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateTodo(e.target.value, todoId)
      console.log(e.target.value)
      document.body.removeEventListener('click', onClickBody)
    }
  })

  const onClickBody = (e) => {
    if (e.target !== inputElem) {
      todoItemElem.removeChild(inputElem)
      document.body.removeEventListener('click', onClickBody)
    }
  }

  document.body.addEventListener('click', onClickBody)
  todoItemElem.appendChild(inputElem)
}

const init = () => {
  todoInputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInputElem.value.trim() !== '') {
      appendToDo(e.target.value)
      console.log(e.target.value)
      todoInputElem.value = ''
    }
  })
  addToDoElem.addEventListener('click', () => {
    if (todoInputElem.value.trim() !== '') {
      appendToDo(todoInputElem.value) // 입력 필드의 값을 사용하여 appendTodos 함수 호출
      console.log(todoInputElem.value)

      todoInputElem.value = '' // 입력 필드 초기화
    }
  })
}

init()
