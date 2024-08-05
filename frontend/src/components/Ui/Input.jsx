import React from 'react'
import './Input.scss'

export const Input = ({ placeholder, value, onChange, className, disabled=false }) => {
    return (
        <div className={`input-wrapper${className ? ` ${className}` : ''}`}>
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
