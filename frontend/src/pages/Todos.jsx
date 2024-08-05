import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import './Todos.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { v4 as uuidv4 } from 'uuid'

import { compareObjects } from '../utils/compareObjects'

import { TodosHeader } from '../components/TodosHeader'
import { TodosItem } from '../components/TodosItem'
import { TodosPreloader } from '../components/preloaders/TodosPreloader'
import { AddTodo } from '../components/AddTodo'

import { useTodosContext } from '../hooks/useTodosContext'
import { usePatchTodos } from '../hooks/usePatchTodos'

import { Error } from '../components/Error'

const findTodoById = (todos, id) => {
    return todos ? todos.find(todo => todo._id === id) : null
}

export const Todo = () => {

    const { id } = useParams()

    const { todos, isLoading: todosLoading } = useTodosContext()
    const { patchTodos, isLoading: isPatchTodosLoading } = usePatchTodos()

    const [currentTodos, setCurrentTodos] = useState(null)
    const [backupTodos, setBackupTodos] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [error, setError] = useState('')

    const [focused, setFocused] = useState(false)

    useEffect(() => {

        const checkTodosAvailability = () => {

            if (todos) {
                const todo = findTodoById(todos, id)
                if (todo) {
                    setCurrentTodos(todo)
                    setBackupTodos(todo)
                    setError('')
                } else {
                    setError('No such todos collection')
                }
                setPageLoading(false)
            }
        }

        checkTodosAvailability()

    }, [todos])

    useEffect(() => {
        if (!compareObjects(currentTodos, backupTodos)) {
            handleSave()
        }
    }, [currentTodos])

    const updateTitle = (title) => {
        handleSave({ ...currentTodos, title })
    }

    const updateTodos = (updatedTodo) => {
        const updatedTodos = currentTodos.todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        )
        handleSave({ ...currentTodos, todos: updatedTodos })
    }

    const addTodo = async (body) => {
        const todos = currentTodos.todos

        const updatedTodos = [...todos, {
            id: uuidv4(),
            body: body.trim(),
            fontStyles: [],
            isCompleted: false
        }]

        await handleSave({ ...currentTodos, todos: updatedTodos })
    }

    const deleteTodo = (id) => {
        const todos = currentTodos.todos.filter((todo) => todo.id !== id)
        handleSave({ ...currentTodos, todos })
    }

    const handleSave = async (todoToSend) => {
        await patchTodos(todoToSend)
    }

    if (pageLoading || todosLoading) {
        return <TodosPreloader />
    }

    if (error) {
        return (
            <div className='todos'>
                <Error>
                    {error}.<br /> Try return to <Link to='/'>home</Link>
                </Error>
            </div>
        )
    }

    return (
        <div className={`todos${focused ? ' todos-focused' : ''}${isPatchTodosLoading ? ' todos-disabled' : ''}`}>
            <TodosHeader currentTodos={currentTodos} updateTitle={updateTitle} setFocused={setFocused} isPatchTodosLoading={isPatchTodosLoading} />
            <div className='todos__body'>
                {currentTodos.todos.map(todo => (
                    <TodosItem
                        key={todo.id}

                        setFocused={setFocused}
                        
                        todo={todo}
                        updateTodos={updateTodos}
                        deleteTodo={deleteTodo}
                    />
                ))}
                <AddTodo setFocused={setFocused} addTodo={addTodo} isPatchTodosLoading={isPatchTodosLoading} />
            </div>
        </div>
    )
}
