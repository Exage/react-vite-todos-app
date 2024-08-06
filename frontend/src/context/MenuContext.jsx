import React, { useReducer, createContext } from "react"

export const MenuContext = createContext()

export const menuReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU':
            return {
                menuOpen: !state.menuOpen
            }
        case 'SET_MENU':
            return {
                menuOpen: action.payload
            }
        default:
            return state
    }
}

export const MenuContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(menuReducer, {
        menuOpen: false
    })

    return (
        <MenuContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MenuContext.Provider>
    )
}