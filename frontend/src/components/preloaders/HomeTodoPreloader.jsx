import React from 'react'

import '../HomeTodo.scss'

import { faThumbtack, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const HomeTodoPreloader = () => {

    return (
        <div className='home__todo home__todo__preloader'>
            <div className='home__todo-content'>

                <div className='home__todo-header'>
                    <h1 className='home__todo-title home__todo-title__preloader'>Loading</h1>
                    <div className='home__todo-sub home__todo-sub__preloader'>
                        Loading
                    </div>
                </div>

                <ul className='home__todo-list'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <li key={index} className={`home__todo-list__item home__todo-list__item__preloader`}>
                            <span>
                                Loading
                            </span>
                        </li>
                    ))}
                </ul>

            </div>
            <div className='home__todo-footer home__todo-footer__preloader'>
                <button className='home__todo-btn'>
                    <FontAwesomeIcon icon={faThumbtack} />
                </button>
                <button className="home__todo-btn">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}
