import React from 'react'

import '../../pages/Todos.scss'

import { TodosHeaderPreloader } from './TodosHeaderPreloader'
import { TodosItemPreloader } from './TodosItemPreloader'

export const TodosPreloader = () => {
    return (
        <div className='todos todos__preloader'>
            <TodosHeaderPreloader />
            <div className='todos__body'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TodosItemPreloader
                        key={index}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}
