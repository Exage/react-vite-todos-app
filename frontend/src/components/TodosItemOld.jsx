import React, { useRef, useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import './TodosItem.scss'

import { addFontStyles } from '../utils/addFontStyles'

import { faPen, faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const allFontStyles = ['bold', 'italic', 'underline', 'linethrough']

export const TodosItem = ({ currentTodos, disabled, setDisabled, todo, updateTodos, deleteTodo }) => {

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
            // const length = todoBodyRef.current.value.length
            // todoBodyRef.current.setSelectionRange(length, length)
        }
    }, [editBody])

    useEffect(() => {
        if (todo.new) {
            setEditBody(true)
            setDisabled(true)
            
            delete todo.new
        }
    }, [todo])

    useEffect(() => {
        updateTodos({ id: todo.id, body, fontStyles, isCompleted })
    }, [fontStyles, body, isCompleted])

    useEffect(() => {
        const updatedTodo = currentTodos.todos.find(item => item.id === todo.id)
        if (updatedTodo) {
            if (updatedTodo.fontStyles !== fontStyles) {
                setFontStyles(updatedTodo.fontStyles)
            }
            if (updatedTodo.body !== body) {
                setBody(updatedTodo.body)
            }
            if (updatedTodo.isCompleted !== isCompleted) {
                setIsCompleted(updatedTodo.isCompleted)
            }
        }
    }, [currentTodos])

    const handleEditBtn = () => {
        setDisabled(true)
        setEditBody(!editBody)
    }

    const handleControlsBtn = () => {
        setShowControlls(!showControls)
    }

    const handleComplete = () => {
        setIsCompleted(!isCompleted)
    }

    const handleInputBlur = () => {
        setDisabled(false)
        setEditBody(false)
    }

    const handleDeleteTodo = () => {
        deleteTodo(todo.id)
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

    return (
        <div className='todos__item'>

            <div className='todos__item-main'>
                <div
                    className={`todos__item-body__wrapper${isCompleted ? ' todos__item-body__wrapper-completed' : ''} ${addFontStyles(fontStyles)}`}
                    onClick={handleComplete}
                >
                    {editBody ? (
                        <TextareaAutosize
                            className='todos__item-body'

                            value={body}
                            onChange={Event => setBody(Event.target.value)}

                            onBlur={handleInputBlur}

                            ref={todoBodyRef}
                            focus={todo.new}
                        />
                    ) : (
                        <span className='todos__item-body'>{body}</span>
                    )}

                </div>

                <div className='todos__item-btns'>
                    <button className={`todos__item-btn${editBody ? ' hidebtn' : ''}`} onClick={handleEditBtn}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className='todos__item-btn' onClick={handleControlsBtn}>
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
                                onClick={handleFontStyleBtn}
                                className={`todos__item-controls__btn ${item}${fontStyles.includes(item) ? ' active' : ''}${disabled ? ' disabled' : ''}`}
                            >
                                {item}
                            </button>
                        ))}

                    </div>

                    <div className='todos__item-controls__edit'>
                        <button
                            onClick={handleDeleteTodo}
                            className='todos__item-controls__btn todos__item-controls__btn-delete'
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