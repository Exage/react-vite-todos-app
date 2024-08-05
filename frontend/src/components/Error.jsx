import React from 'react'
import './Error.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export const Error = ({ children }) => {
    return (
        <div className='error'>
            <FontAwesomeIcon icon={faTriangleExclamation} shake />
            {children}
        </div>
    )
}
