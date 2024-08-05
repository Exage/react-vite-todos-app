import React, { useState } from 'react'

import { useAuthContext } from './useAuthContext'
import { useTodosContext } from './useTodosContext'

export const usePatchTodos = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const patchTodos = async (todos) => {
        setIsLoading(true)
        setError(null)

        if (!user) {
            setError('You must be authorized!')
            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${todos._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(todos)
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if (response.ok) {
            dispatch({ type: 'UPDATE_TODOS', payload: json })
            setIsLoading(false)
            return json
        }
    }

    return { isLoading, patchTodos, error }
}
