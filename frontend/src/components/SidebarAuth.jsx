import React from 'react'
import { Link } from 'react-router-dom'

export const SidebarAuth = () => {
    return (
        <div className='sidebar__user'>
            <div className="sidebar__user-auth">
                <Link to='/signup' className='btn'>Sign up</Link>
                <Link to='/login' className='btn btn-bordered'>Log in</Link>
            </div>
        </div>
    )
}
