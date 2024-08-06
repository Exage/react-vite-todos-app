import React from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import { Link } from 'react-router-dom'

import './Start.scss'

import start1Light from '../assets/start/start-1-light.jpg'
import start1Dark from '../assets/start/start-1-dark.jpg'
import start11Light from '../assets/start/start-1-1-light.jpg'
import start11Dark from '../assets/start/start-1-1-dark.jpg'
import start2Light from '../assets/start/start-2-light.jpg'
import start2Dark from '../assets/start/start-2-dark.jpg'
import start21Light from '../assets/start/start-2-1-light.jpg'
import start21Dark from '../assets/start/start-2-1-dark.jpg'

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
                <div className='start__block-photo start__block-photo__desktop'>
                    {theme === 'light' && <img src={start1Light} alt='' />}
                    {theme === 'dark' && <img src={start1Dark} alt='' />}
                </div>
                <div className='start__block-photo start__block-photo__response'>
                    {theme === 'light' && <img src={start11Light} alt='' />}
                    {theme === 'dark' && <img src={start11Dark} alt='' />}
                </div>
            </div>
            <div className='start__block'>
                <div className='start__block-photo start__block-photo__desktop'>
                    {theme === 'light' && <img src={start2Light} alt='' />}
                    {theme === 'dark' && <img src={start2Dark} alt='' />}
                </div>
                <div className='start__block-photo start__block-photo__response'>
                    {theme === 'light' && <img src={start21Light} alt='' />}
                    {theme === 'dark' && <img src={start21Dark} alt='' />}
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
