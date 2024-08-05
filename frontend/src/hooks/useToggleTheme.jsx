import { useEffect, useState } from 'react'
import { useThemeContext } from './useThemeContext'

export const useToggleTheme = () => {

    const { dispatch, theme } = useThemeContext()

    const toggleTheme = () => {
        dispatch({ type: 'TOGGLE_THEME' })
    }

    return { toggleTheme, theme }
}