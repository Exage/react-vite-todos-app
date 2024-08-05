import { createContext, useReducer, useEffect, useState } from 'react'

import { useAuthContext } from '../hooks/useAuthContext'

export const TodosContext = createContext()

export const todosReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TODOS':
			return {
				todos: action.payload
			}
		case 'CREATE_TODOS':
			return {
				todos: [action.payload, ...state.todos]
			}
		case 'UPDATE_TODOS':
			return {
				todos: state.todos.map((item) =>
					item._id === action.payload._id ? { ...item, ...action.payload } : item
				)
			}
		case 'DELETE_TODOS':
			return {
				todos: state.todos.filter((item) => item._id !== action.payload._id)
			}
		case 'SET_PINNED':

			const pinnedItems = state.todos.filter((item) => item.isPinned === true)

			return {
				pinned: [action.payload, ...pinnedItems]
			}
		default:
			return state
	}
}

export const TodosContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(todosReducer, {
		todos: null
	})

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const { user } = useAuthContext()

	const fetchTodos = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/`, {
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			})
			if (!response.ok) {
				throw new Error('Failed to fetch todos')
			}
			
			const json = await response.json()
			dispatch({ type: 'SET_TODOS', payload: json })
			setError('')

		} catch (error) {
			setError(error.message)
			console.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (user) {
			fetchTodos()
		}
	}, [user])

	return (
		<TodosContext.Provider value={{ ...state, dispatch, loading, error }}>
			{children}
		</TodosContext.Provider>
	)
}