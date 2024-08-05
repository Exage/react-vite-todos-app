import React from 'react'
import { Link } from 'react-router-dom'
import { useTimeUpdates } from '../hooks/useTimeUpdates'

import './HomeTodo.scss'

import { addFontStyles } from '../utils/addFontStyles'

import { faThumbtack, faTrash, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTodosContext } from '../hooks/useTodosContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useDeleteTodos } from '../hooks/useDeleteTodos'
import { usePinTodos } from '../hooks/usePinTodos'

export const HomeTodo = ({ todo }) => {

    const { deleteTodos, isLoading: deleteLoading } = useDeleteTodos()
    const { pinTodos, isLoading: pinLoading } = usePinTodos()

    const currentTime = useTimeUpdates(todo.createdAt)

    const handlePin = async (Event) => {
        Event.preventDefault()

        try {
            await pinTodos(todo)
        } catch (error) {
            alert(error)
        }
    }

    const handleDelete = async (Event) => {
        Event.preventDefault()
        
        try {
            await deleteTodos(todo)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Link to={`/t/${todo._id}`} className='home__todo'>
            <div className='home__todo-content'>

                <div className='home__todo-header'>
                    <h1 className='home__todo-title'>
                        {`${todo.title}${todo.isSameTitle ? ` (${todo.isSameTitle})` : ''}`}
                    </h1>
                    <div className='home__todo-sub'>
                        {currentTime} ago
                        {/* {todo.createdAt !== todo.updatedAt && ' • edited'} */}
                    </div>
                </div>

                <ul className='home__todo-list'>
                    {todo.todos.slice(0, 3).map(item => (
                        <li key={item.id} className={`home__todo-list__item${item.isCompleted ? ' home__todo-list__item-completed' : ''} ${addFontStyles(item.fontStyles)}`}>
                            <span>
                                {item.body}
                            </span>
                        </li>
                    ))}
                </ul>

            </div>
            <div className='home__todo-footer'>
                <button 
                    className={`home__todo-btn${todo.isPinned ? ' home__todo-btn__pinned' : ''}`} 
                    onClick={handlePin} 
                    disabled={pinLoading}
                >
                    {pinLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : <FontAwesomeIcon icon={faThumbtack} />}
                </button>
                <button 
                    className='home__todo-btn home__todo-btn__red' 
                    onClick={handleDelete} 
                    disabled={deleteLoading}
                >
                    {deleteLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : <FontAwesomeIcon icon={faTrash} />}
                </button>
            </div>
        </Link>
    )
}
