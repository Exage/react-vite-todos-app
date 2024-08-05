import React, { useEffect, useState } from 'react'

import './HomeTodos.scss'

import { faThumbtack } from '@fortawesome/free-solid-svg-icons'

import { HomeTodoPreloader } from './preloaders/HomeTodoPreloader'
import { useTodosContext } from '../hooks/useTodosContext'
import { Error } from './Error'

import { HomeTodosBlock } from './HomeTodosBlock'

export const HomeTodos = () => {

    const { todos: todosContext, loading, error } = useTodosContext()
    const [todos, setTodos] = useState([])
    const [pinned, setPinned] = useState([])

    useEffect(() => {
        if (todosContext) {
            setPinned(todosContext.filter(item => item.isPinned))
            setTodos(todosContext.filter(item => !item.isPinned))
        }
    }, [todosContext])

    if (loading) {
        return (
            <div className='home__todos'>
                <div className='home__todos-regular'>
                    <div className='home__todos-items'>
                        {Array.from({ length: 5 }).map((_, index) => <HomeTodoPreloader key={index} />)}
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <Error>{error}</Error>
        )
    }

    return (
        <div className='home__todos'>

            {(!pinned.length && !todos.length) && <h3>there is nothing here, add new todos via 'add new collection'</h3>}
            
            {pinned.length > 0 && <HomeTodosBlock title="Pinned todo's" icon={faThumbtack} items={pinned} />}
            {todos.length > 0 && <HomeTodosBlock items={todos} />}

        </div>
    )
}
