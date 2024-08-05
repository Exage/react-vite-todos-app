import { useState } from 'react'

import { useTodosContext } from './useTodosContext'
import { useAuthContext } from './useAuthContext'

export const usePinTodos = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const pinTodos = async (todo) => {
        setIsLoading(true)
        setError(null)

        if (!user) {
            setError('You must be authorized!')
            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${todo._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ ...todo, isPinned: !todo.isPinned })
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_TODOS', payload: json })
            setIsLoading(false)
        }
        if (!response.ok) {
            setError(json.error)
            alert(json.error)
        }
    }

    return { isLoading, pinTodos, error }
}
