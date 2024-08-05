import { useAuthContext } from './useAuthContext'
import { useTodosContext } from './useTodosContext'

export const useLogout = () => {
    
    const { dispatch: authDispatch } = useAuthContext() 
    const { dispatch: todosDispatch } = useTodosContext() 

    const logout = () => {
        localStorage.removeItem('react-vite-todos-app-user')

        authDispatch({ type: 'LOGOUT' })
        todosDispatch({ type: 'SET_TODOS', payload: null })
    }

    return { logout }

}