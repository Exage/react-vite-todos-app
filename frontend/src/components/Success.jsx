import React from 'react'
import './Success.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export const Success = ({ children }) => {
    return (
        <div className='success'>
            <FontAwesomeIcon icon={faCircleCheck} bounce />
            {children}
        </div>
    )
}
