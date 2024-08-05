import React, { useEffect, useRef, useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faArrowTurnUp } from '@fortawesome/free-solid-svg-icons'

import './AddTodo.scss'

export const AddTodo = ({ setFocused, addTodo, isPatchTodosLoading }) => {

    const inpurRef = useRef(null)

    const [body, setBody] = useState('')
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        if (showForm && inpurRef.current) {
            inpurRef.current.focus()
            setFocused(true)
        }
    }, [showForm])

    const handleShowForm = () => {
        setShowForm(true)
    }

    const handleBlurForm = () => {
        if (body.length === 0) {
            setShowForm(false)
        }
        setFocused(false)
    }

    const handleFocusForm = () => {
        setFocused(true)
    }

    const handleSubmit = async (Event) => {
        Event.preventDefault()
        await addTodo(body)
        setFocused(false)
        setBody('')
        setShowForm(false)
    }

    return (
        <div className='todos__add-item'>
            {showForm ? (
                <form className='todos__add-item__form' onSubmit={handleSubmit}>
                    <input
                        className='todos__add-item__form-input'
                        type="text"
                        placeholder='Add new todo'

                        ref={inpurRef}

                        disabled={isPatchTodosLoading}

                        value={body}
                        onChange={Event => setBody(Event.target.value)}

                        onBlur={handleBlurForm}
                        onFocus={handleFocusForm}
                    />
                    <button type='submit' className='todos__add-item__form-btn'>
                        <FontAwesomeIcon icon={faArrowTurnUp} />
                    </button>
                </form>
            ) : (
                <button className='todos__add-item__btn' onClick={handleShowForm}>
                    <span className='todos__add-item__btn-icon'>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </span>
                    Add new todo
                </button>
            )}
        </div>
    )
}
