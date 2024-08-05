import { useState } from 'react'

import { useTodosContext } from './useTodosContext'
import { useAuthContext } from './useAuthContext'

export const useDeleteTodos = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const deleteTodos = async (todo) => {
        setIsLoading(true)
        setError(null)

        if (!user) {
            setError('You must be authorized!')
            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${todo._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_TODOS', payload: json })
            setIsLoading(false)
        }
        if (!response.ok) {
            setError(json.error)
            alert(json.error)
        }
    }

    return { isLoading, deleteTodos, error }
}