import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faGears} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export const SidebarUser = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout()

    const [userMenuOpen, setUserMenuOpen] = useState(false)

    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (Event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenuOpen(false)
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const openUserMenu = () => setUserMenuOpen(!userMenuOpen)

    const handleLogout = () => logout()

    return (
        <div ref={menuRef} className={`sidebar__user${userMenuOpen ? ' sidebar__user-open' : ''}`}>

            <div className='sidebar__user-heading clickable' onClick={openUserMenu}>
                <h1 className='sidebar__user-name'>
                    <FontAwesomeIcon icon={faUser} />
                    {user.name}
                </h1>
                <h1 className='sidebar__user-email'>
                    {user.email}
                </h1>
            </div>
            <div className='sidebar__user-menu'>
                <div className='sidebar__user-menu__links'>
                    <Link to='/usersettings' className='sidebar__user-menu__link'>
                        <FontAwesomeIcon icon={faGears} /> Account settings
                    </Link>
                </div>
                <button 
                    className='btn sidebar__user-menu__logout'
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>

        </div>
    )
}
