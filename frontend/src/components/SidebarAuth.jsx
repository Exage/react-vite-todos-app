import React from 'react'
import { useToggleMenu } from '../hooks/useToggleMenu'
import { Link } from 'react-router-dom'

export const SidebarAuth = () => {
    const { setMenuOpen } = useToggleMenu()

    const handleClickLink = () => setMenuOpen(false)

    return (
        <div className='sidebar__user'>
            <div className="sidebar__user-auth">
                <Link to='/signup' className='btn' onClick={handleClickLink}>Sign up</Link>
                <Link to='/login' className='btn btn-bordered' onClick={handleClickLink}>Log in</Link>
            </div>
        </div>
    )
}
