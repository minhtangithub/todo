import {useState, useEffect, useRef} from 'react'
import {toast} from 'react-toastify';
import Chart from './Chart'
import TodoForm from './TodoForm'
import Todo from './Todo'

function Todolist () {
    const [todos, setTodos] = useState((localStorage.getItem('todos') == undefined) ? [] : JSON.parse(localStorage.getItem('todos')))
    const [input, setInput] = useState('')
    const [chart, setChart] = useState(0)
    const [edit, setEdit] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        onChangeChart()
    }, [todos])

    function saveToLocalStorage (newTodos) {
        const local = localStorage
        local.setItem('todos', JSON.stringify(newTodos))
    }

    function handleChange (e) {
        setInput(e.target.value)
    }

    function onChangeChart () {
        const countComplete = todos.filter((todo)=>todo.checked).length
        const newChart = (todos.length === 0) ? 0 : countComplete*100/todos.length
        setChart(Math.floor(newChart))
    }

    function handleCheckChange (todo) {
        todos.forEach((item) => {if (item === todo) {item.checked = !item.checked}} )
        saveToLocalStorage(todos)
        setTodos(todos)
        onChangeChart()
    }

    function handleSubmit (e) {
        e.preventDefault()
        if (!inputRef.current.value) {
            toast.error('Your todo is empty!')
            return
        }

        setInput('')
        const newID = Math.floor(Math.random()*100000)
        const newClassName = String(newID%4)
        const newTodo = {
            text: inputRef.current.value,
            checked: false,
            id: newID,
            edit: false,
            className: newClassName
        }

        const newTodos = [...todos, newTodo]
        saveToLocalStorage(newTodos)
        setTodos(Todos => newTodos)
        inputRef.current.focus()
        toast.success('Add successfully!')
    }

    function removeTodo (todo) {
        const newTodos = [...todos.filter((item) => (item.id !== todo.id) )]
        saveToLocalStorage(newTodos)
        setTodos(newTodos)
        toast.success('Delete successfully!')
    }

    function editTodo (todo) {
        let targetTodoText
        const todosCopy = todos
        todosCopy.forEach((item) => {
            if (item === todo) {
                targetTodoText = item.text
                item.edit = true
            }
        })
        saveToLocalStorage(todosCopy)
        setEdit(targetTodoText)
        setTodos(todosCopy)
    }

    function saveTodo () {
        const todosCopy = todos
        todosCopy.forEach((item) => {
            if (item.edit) {
                item.edit = false
                item.text = edit
            }
        })
        saveToLocalStorage(todosCopy)
        setEdit('')
        setTodos(todosCopy)
        toast.success('Edit successfully!')
    }

    function handleOnChangeEdit (e) {
        setEdit(e.target.value)
    }

    function handleDragEnd ({source, destination}) {
        if (!destination) return
        const [draggedTodo] = todos.splice(source.index, 1)
        todos.splice(destination.index, 0, draggedTodo)
        setTodos(todos)
    }

    return (
        <>
            <h1>What's your plan today?</h1>
            <TodoForm
                handleSubmit = {handleSubmit}
                inputRef = {inputRef}
                input = {input}
                handleChange = {handleChange}
            >
            </TodoForm>
            <Todo
                todos = {todos}
                handleDragEnd = {handleDragEnd}
                editTodo = {editTodo}
                removeTodo = {removeTodo}
                handleCheckChange = {handleCheckChange}
                edit = {edit}
                handleOnChangeEdit = {handleOnChangeEdit}
                saveTodo = {saveTodo}
            >
            </Todo>
            <Chart 
                chart = {chart}
                className = 'chart'
            ></Chart>
        </>
    )
}

export default Todolist