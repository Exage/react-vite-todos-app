import React from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import { Link } from 'react-router-dom'

import './Start.scss'

import start1Light from '../assets/start/start-1-light.jpg'
import start1Dark from '../assets/start/start-1-dark.jpg'
import start2Light from '../assets/start/start-2-light.jpg'
import start2Dark from '../assets/start/start-2-dark.jpg'

export const Start = () => {

    const { theme } = useThemeContext()

    return (
        <div className='start'>

            <div className='start__block'>
                <div className='start__block-text'>
                    <h1 className='start__block-text__title'>Welcome to todo’s app</h1>
                    <p className='start__block-text__text'>
                        Create and manage your tasks in the easiest way
                    </p>
                </div>
                <div className='start__block-photo'>
                    {theme === 'light' && <img src={start1Light} alt='' />}
                    {theme === 'dark' && <img src={start1Dark} alt='' />}
                </div>
            </div>
            <div className='start__block'>
                <div className='start__block-photo'>
                    {theme === 'light' && <img src={start2Light} alt='' />}
                    {theme === 'dark' && <img src={start2Dark} alt='' />}
                </div>
                <div className='start__block-text'>
                    <h1 className='start__block-text__title'>All tasks at a glance</h1>
                    <p className='start__block-text__text'>
                        A convenient and intuitive interface will help you organize your tasks
                    </p>
                </div>
            </div>
            <div className='start__bottom'>
                <h1 className='start__bottom-title'>Create your account or log in</h1>
                <div className="start__bottom-btns">
                    <Link to='/signup' className='btn'>Sign up</Link>
                    <Link to='/login' className='btn btn-bordered'>Log in</Link>
                </div>
            </div>

        </div>
    )
}
