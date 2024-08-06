import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './HomeHeading.scss'

import { faPlus, faThumbtack, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTodosContext } from '../hooks/useTodosContext'

import { InputSearch } from './Ui/InputSearch'
import { useCreateTodos } from '../hooks/useCreateTodos'

export const HomeHeading = () => {

    const { todos } = useTodosContext()
    const { createTodos, isLoading } = useCreateTodos()

    const navigate = useNavigate()

    const [fixHeader, setFixHeader] = useState(false)
    const headingHeight = 50

    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const handleHeaderPosition = () => {
        if (window.scrollY >= 15) {
            setFixHeader(true)
        } else {
            setFixHeader(false)
        }
    }

    useEffect(() => {
        handleHeaderPosition()
        window.addEventListener('scroll', handleHeaderPosition)

        return () => {
            window.removeEventListener('scroll', handleHeaderPosition)
        }
    }, [])

    useEffect(() => {
        if (search.trim()) {
            document.body.classList.add('no-scroll')

            const newFilter = todos.filter(value => {
                return value.title.toLowerCase().includes(search.trim().toLowerCase())
            })

            setFilteredData(newFilter)
        } else {
            closeOverlay()
        }
    }, [search])

    const handleNewTodo = async () => {
        const newTodo = await createTodos()
        navigate(`/t/${newTodo._id}`)
    }

    const closeOverlay = () => {
        setSearch('')
        setFilteredData([])
        document.body.classList.remove('no-scroll')
    }

    return (
        <div
            className="home__heading-placeholder"
            style={{
                height: `${headingHeight}px`
            }}
        >
            <div className={`home__heading-overlay${filteredData.length ? ' active' : ''}`} onClick={closeOverlay}></div>
            <div
                className={`home__heading${fixHeader ? ' fixed' : ''}${filteredData.length ? ' no-border' : ''}`}
                style={{
                    height: `${headingHeight}px`
                }}
            >
                <div className="home__heading-inner">
                    <InputSearch
                        placeholder='Search'

                        value={search}
                        onChange={Event => setSearch(Event.target.value)}
                    />

                    {filteredData.length > 0 && (
                        <div className="home__heading-search-results">
                            <div className="home__heading-search-results__content">
                                {filteredData.map(item => (
                                    <Link
                                        to={`/t/${item._id}`}
                                        key={item._id}
                                        className='home__heading-search-results__item'
                                    >
                                        <h1 className='home__heading-search-results__item-title'>
                                            {item.isPinned && <FontAwesomeIcon className='icon' icon={faThumbtack} />}
                                            <span>
                                                {item.title}{item.isSameTitle ? ` (${item.isSameTitle})` : ''}
                                            </span>
                                        </h1>
                                        <div className='home__heading-search-results__item-todos'>
                                            {item.todos.map(todo => (
                                                <span key={todo.id} className='home__heading-search-results__item-todo'>
                                                    {todo.body}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={`home__heading-btn__wrapper${filteredData.length > 0 ? ' hide' : ''}`}>
                        <button className="btn btn-bordered home__heading-btn" onClick={handleNewTodo} disabled={isLoading}>
                            {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : <FontAwesomeIcon icon={faPlus} />}
                            {/* <FontAwesomeIcon icon={faPlus} beat={isLoading} /> */}
                            <span>
                                Add new collection
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
