import React from 'react'
import { useMenuContext } from './useMenuContext'

export const useToggleMenu = () => {
    const { dispatch, menuOpen } = useMenuContext()

    const toggleMenuOpen = () => {
        dispatch({ type: 'TOGGLE_MENU' })
    }

    const setMenuOpen = (state) => {
        dispatch({ type: 'SET_MENU', payload: state })
    }

    return { toggleMenuOpen, setMenuOpen, menuOpen }
}
