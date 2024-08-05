import React from 'react'
import { Link } from 'react-router-dom'

import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Sidebar.scss'

import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'

import { SidebarUser } from './SidebarUser'
import { SidebarAuth } from './SidebarAuth'
import { useAuthContext } from '../hooks/useAuthContext'
import { useThemeContext } from '../hooks/useThemeContext'
import { useToggleTheme } from '../hooks/useToggleTheme'

const githubUrl = 'https://github.com/Exage'

export const Sidebar = () => {

    const { user } = useAuthContext()
    const { toggleTheme, theme } = useToggleTheme()

    const handleToggleTheme = () => {
        toggleTheme()
    }

    return (
        <aside className='sidebar'>

            <div className="sidebar__sticky">

                <div className='sidebar__logo'>
                    <Link to='/' className={`logo${theme ? ` ${theme}` : ''}`}>
                        {/* {theme === 'light' && <img src={logoLight} alt='Todos Add./' />}
                        {theme === 'dark' && <img src={logoDark} alt='Todos Add./' />} */}
                        <span>Todos Add./</span>
                    </Link>
                </div>

                {user && <SidebarUser />}
                {!user && <SidebarAuth />}

                <div className='sidebar__bottom'>
                    <button className="sidebar__bottom-btn" onClick={handleToggleTheme}>
                        <FontAwesomeIcon
                            icon={faCircleHalfStroke}
                            style={{
                                transform: `rotate(${theme === 'light' ? 0 : 180 }deg)`
                            }}
                        />
                        {theme.charAt(0).toUpperCase() + theme.slice(1, theme.length)} Theme
                    </button>
                    <p className='sidebar__bottom-text'>
                        by <a target='_blank' href={githubUrl}>Exage</a>
                    </p>
                </div>

            </div>

        </aside>
    )
}
