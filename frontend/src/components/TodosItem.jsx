import React, { useRef, useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import './TodosItem.scss'

import { addFontStyles } from '../utils/addFontStyles'
import { compareArrays } from '../utils/compareArrays'

import { faPen, faEllipsis, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePatchTodos } from '../hooks/usePatchTodos'

const allFontStyles = ['bold', 'italic', 'underline', 'linethrough']

export const TodosItem = ({ setFocused, todo, updateTodos, deleteTodo }) => {

    const todoBodyRef = useRef(null)

    const [fontStyles, setFontStyles] = useState(todo.fontStyles)
    const [body, setBody] = useState(todo.body)
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted)

    const [editBody, setEditBody] = useState(false)
    const [showControls, setShowControlls] = useState(false)

    useEffect(() => {
        if (editBody && todoBodyRef.current) {
            todoBodyRef.current.focus()
            todoBodyRef.current.select()
        }
    }, [editBody])

    useEffect(() => {
        if (!compareArrays(todo.fontStyles, fontStyles)) {
            const newTodo = { ...todo, fontStyles }
            updateTodos(newTodo)
        }
        if (todo.isCompleted !== isCompleted) {
            const newTodo = { ...todo, isCompleted }
            updateTodos(newTodo)
        }
    }, [fontStyles, isCompleted])

    const handleEditBody = () => {
        setEditBody(true)
        setFocused(true)
    }

    const handleBlurEdit = () => {
        setEditBody(false)
        setFocused(false)

        const newTodo = { ...todo, body: body.trim() }
        updateTodos(newTodo)
    }

    const setShowControls = () => {
        setShowControlls(!showControls)
    }

    const handleComplete = () => {
        setIsCompleted(!isCompleted)
    }

    const handleFontStyleBtn = (Event) => {
        const value = Event.target.value
        let updatedFontStyles = []

        if (fontStyles.includes(value)) {
            updatedFontStyles = fontStyles.filter(style => style !== value)
        } else {
            updatedFontStyles = [...fontStyles, value]
        }

        setFontStyles(updatedFontStyles)
    }

    const handleDeleteTodo = () => {
        deleteTodo(todo.id)
    }

    return (
        <div className='todos__item'>

            <div className='todos__item-main'>
                <div
                    className={`todos__item-body__wrapper${isCompleted ? ' todos__item-body__wrapper-completed' : ''} ${addFontStyles(fontStyles)}`}
                    onClick={handleComplete}
                >
                    {/* {isSendPatch ? <FontAwesomeIcon icon={faSpinner} /> : <span></span> } */}
                    {editBody ? (
                        <TextareaAutosize
                            className='todos__item-body'

                            value={body}
                            onChange={Event => setBody(Event.target.value)}

                            onBlur={handleBlurEdit}
                            ref={todoBodyRef}
                        />
                    ) : (
                        <span className='todos__item-body'>{body}</span>
                    )}

                </div>

                <div className='todos__item-btns'>
                    <button className={`todos__item-btn${editBody ? ' hidebtn' : ''}`} onClick={handleEditBody}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className='todos__item-btn' onClick={setShowControls}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
            </div>

            <div

                className='todos__item-controls__wrapper'
                style={{
                    height: `${showControls ? 30 : 0}px`
                }}

            >
                <div className='todos__item-controls'>
                    <div className='todos__item-controls__fontstyles'>

                        {allFontStyles.map((item, index) => (
                            <button
                                key={index}
                                value={item}
                                className={`todos__item-controls__btn ${item}${fontStyles.includes(item) ? ' active' : ''}`}
                                onClick={handleFontStyleBtn}
                            >
                                {item}
                            </button>
                        ))}

                    </div>

                    <div className='todos__item-controls__edit'>
                        <button
                            className='todos__item-controls__btn todos__item-controls__btn-delete'
                            onClick={handleDeleteTodo}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            delete
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}