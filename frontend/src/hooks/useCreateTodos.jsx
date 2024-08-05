import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { useTodosContext } from './useTodosContext'
import { useAuthContext } from './useAuthContext'

export const useCreateTodos = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const createTodos = async () => {
        setIsLoading(true)
        setError(null)

        if (!user) {
            setError('You must be logged in!')
            return
        }

        const todos = {
            title: 'New todos',
            isPinned: false,
            todos: [
                {
                    id: uuidv4(),
                    body: 'Todo 1',
                    fontStyles: [],
                    isCompleted: false
                },
                {
                    id: uuidv4(),
                    body: 'Todo 2',
                    fontStyles: [],
                    isCompleted: false
                },
                {
                    id: uuidv4(),
                    body: 'Todo 3',
                    fontStyles: [],
                    isCompleted: false
                }
            ]
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
            method: 'POST',
            body: JSON.stringify(todos),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'CREATE_TODOS', payload: json })
            setIsLoading(false)
            return json
        }

        if (!response.ok) {
            setError(json.error)
        }
    }

    return { isLoading, createTodos, error }
}
