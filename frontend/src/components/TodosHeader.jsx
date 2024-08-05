import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import { useTimeUpdates } from '../hooks/useTimeUpdates'

import './TodosHeader.scss'

import { faArrowLeft, faCircleNotch, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TodosHeader = ({ currentTodos, updateTitle, setFocused, isPatchTodosLoading }) => {

    const headingInputRef = useRef(null)

    const [title, setTitle] = useState(`${currentTodos.title}${currentTodos.isSameTitle ? ` (${currentTodos.isSameTitle})` : ''}`)
    const [editTitle, setEditTitle] = useState(false)

    const currentTime = useTimeUpdates(currentTodos.createdAt)

    useEffect(() => {
        if (editTitle && headingInputRef.current) {
            headingInputRef.current.focus()
            headingInputRef.current.select()
        }
    }, [editTitle])

    useEffect(() => {
        if (title !== currentTodos.title) {
            setTitle(`${currentTodos.title}${currentTodos.isSameTitle ? ` (${currentTodos.isSameTitle})` : ''}`)
        }
    }, [currentTodos])

    const handleFocus = () => {
        setEditTitle(true)
        setFocused(true)
    }

    const handleBlur = () => {
        setEditTitle(false)
        setFocused(false)

        updateTitle(title)
    }

    return (
        <div className="todos__header">

            <div className="todos__header-sup">
                <Link to='/' className="todos__header-sup__link">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    to home
                </Link>
                <div className="todos__header-sup__state">
                    {isPatchTodosLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : <FontAwesomeIcon icon={faCircleCheck} />}
                </div>
            </div>

            <div
                className="todos__header-title__wrapper"
                onDoubleClick={handleFocus}
            >
                {editTitle ? (
                    <TextareaAutosize
                        className="todos__header-title"

                        value={title}
                        onChange={Event => setTitle(Event.target.value)}

                        onBlur={handleBlur}

                        ref={headingInputRef}
                    />
                ) : (
                    <span className='todos__header-title'>{title}</span>
                )}
            </div>

            <div className="todos__header-sub">
                created {currentTime} ago
                {/* {currentTodos.createdAt !== currentTodos.updatedAt && ` • edited ${formatDistanceToNow(currentTodos.updatedAt)} ago`} */}
            </div>
        </div>
    )
}
