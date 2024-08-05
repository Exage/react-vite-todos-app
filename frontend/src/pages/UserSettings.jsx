import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

import './UserSettings.scss'

export const UserSettings = () => {
    return (
        <div className='usersettings'>

            <div className="usersettings__header">
                <h1>Account settings</h1>
            </div>

            <div className="usersettings__body">
                <div className='usersettings__nav'>
                    <NavLink className='usersettings__nav-link' to='name'>Name</NavLink>
                    <NavLink className='usersettings__nav-link' to='password'>Password</NavLink>
                </div>

                <div className="usersettings__content">
                    <div className="usersettings__content-inner">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
