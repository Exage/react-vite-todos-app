import { useState } from 'react' 
import { useAuthContext } from './useAuthContext'

export const useChangeName = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [success, setSuccess] = useState(null)

    const { dispatch } = useAuthContext()

    const changeName = async (email, name, newName) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/updateName`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, newName })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem('react-vite-todos-app-user', JSON.stringify(json.user))
            
            dispatch({ type: 'LOGIN', payload: json.user })

            setIsLoading(false)
            setSuccess(json.message)
        }
    }

    return { isLoading, changeName, error, success }
}