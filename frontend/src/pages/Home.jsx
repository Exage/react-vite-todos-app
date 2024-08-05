import React from 'react'

import { HomeHeading } from '../components/HomeHeading'
import { HomeTodos } from '../components/HomeTodos'

import './Home.scss'

export const Home = () => {
    return (
        <div className='home'>
            <HomeHeading />
            <HomeTodos />
        </div>
    )
}
