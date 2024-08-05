import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import { useTimeUpdates } from '../hooks/useTimeUpdates'

import './TodosHeader.scss'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export const TodosHeader = ({ currentTodos, updateTitle }) => {

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
        updateTitle(title)
    }, [title])

    useEffect(() => {
        if (currentTodos.title !== title) {
            setTitle(`${currentTodos.title}${currentTodos.isSameTitle ? ` (${currentTodos.isSameTitle})` : ''}`)
        }
    }, [currentTodos])

    return (
        <div className="todos__header">

            <div className="todos__header-sup">
                <Link to='/' className="todos__header-sup__link">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    to home
                </Link>
            </div>

            <div
                className="todos__header-title__wrapper"
                onDoubleClick={() => setEditTitle(true)}
            >
                {editTitle ? (
                    <TextareaAutosize
                        className="todos__header-title"

                        value={title}
                        onChange={Event => setTitle(Event.target.value)}

                        onBlur={() => setEditTitle(false)}

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
