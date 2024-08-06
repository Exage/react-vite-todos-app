import React from 'react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext'
import { useToggleMenu } from '../hooks/useToggleMenu'

import { faBars, faV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './MobileMenu.scss'

export const MobileMenu = () => {

    const { theme } = useThemeContext()
    const { menuOpen, toggleMenuOpen } = useToggleMenu()

    const handleMenuOpen = () => {
        toggleMenuOpen(true)
    }

    return (
        <div className='mobilemenu__wrapper-fixed'>
            <div className='mobilemenu__wrapper'>

                <div className='mobilemenu'>
                    <Link to='/' className={`logo${theme ? ` ${theme}` : ''}`}>
                        <span>Todos Add./</span>
                    </Link>
                    <button className='mobilemenu__btn' onClick={handleMenuOpen}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>

            </div>
        </div>
    )
}
