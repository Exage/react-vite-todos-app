import React from 'react'
import './Input.scss'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const InputSearch = ({ placeholder, value, onChange, className, disabled=false }) => {

    return (
        <div className={`input-wrapper input-wrapper__search${className ? ` ${className}` : ''}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={`input-wrapper__search-icon${value ? ' filled' : ''}`} />
            <input
                className='input'
                
                type='text'
                
                placeholder={placeholder}

                value={value}
                onChange={onChange}

                disabled={disabled}
            />
        </div>
    )
}
