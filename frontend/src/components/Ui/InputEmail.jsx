import React from 'react'
import './Input.scss'

export const InputEmail = ({ placeholder, value, onChange, className, disabled=false }) => {
    return (
        <div className={`input-wrapper${className ? ` ${className}` : ''}`}>
            <input
                className='input'
                
                type='email'
                
                placeholder={placeholder}

                value={value}
                onChange={onChange}

                disabled={disabled}
            />
        </div>
    )
}
