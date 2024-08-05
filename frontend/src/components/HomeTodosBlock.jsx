import React, { useEffect, useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'

import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faArrowDownZA } from '@fortawesome/free-solid-svg-icons'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { HomeTodo } from './HomeTodo'

export const HomeTodosBlock = ({ items, title, icon }) => {

    const [todos, setTodos] = useState(items)

    const [sortByDate, setSortByDate] = useState('newest')
    const [sortByTitle, setSortByTitle] = useState(null)

    useEffect(() => {
        const sortedItems = items.sort((a, b) => {
            return sortByDate === 'newest'
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
        })

        setTodos([...sortedItems])
    }, [items, sortByDate])

    const handleSortByDate = () => {
        setSortByDate((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
    }

    return (
        <div className='home__todos-wrapper'>

            {title && (
                <h1 className='home__todos-title'>
                    {icon && <FontAwesomeIcon icon={icon} />}
                    {title}
                </h1>
            )}

            <div className='home__todos-controls'>
                <button onClick={handleSortByDate} className='home__todos-controls__btn'>
                    <FontAwesomeIcon icon={faSort} />
                    sort {sortByDate ? `${sortByDate}` : 'by date'}
                </button>
            </div>
            <div className='home__todos-items'>
                {todos.map(todo => <HomeTodo key={todo._id} todo={todo} />)}
            </div>
        </div>
    )
}
