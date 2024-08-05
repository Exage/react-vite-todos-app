import React, { useReducer, createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export const themeReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            const newTheme = state.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('react-vite-todos-app-theme', JSON.stringify(newTheme))
            return {
                theme: newTheme
            }
        case 'SET_THEME':
            return {
                theme: action.payload
            }
        default:
            return state
    }
}

export const ThemeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, {
        theme: JSON.parse(localStorage.getItem('react-vite-todos-app-theme')) || 'light'
    })

    return (
        <ThemeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    )
}