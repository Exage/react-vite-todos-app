import React, { useState } from 'react'
import './Input.scss'

import { ReactSVG } from 'react-svg'
import eye from '../../assets/eye.svg'
import eyeSlash from '../../assets/eye-slash.svg'

export const InputPassword = ({ placeholder, value, onChange, className, disabled=false }) => {

    const [showPassword, setShowPassword] = useState(false)

    const toggleShow = () => setShowPassword(!showPassword)

    return (
        <div className={`input-wrapper${className ? ` ${className}` : ''}`}>
            <input
                className='input input-password'
                
                type={showPassword ? 'text' : 'password'}
                
                placeholder={placeholder}

                value={value}
                onChange={onChange}
                
                disabled={disabled}
            />
            <a className='input-icon' onClick={toggleShow}>
                {showPassword ? <ReactSVG src={eye} /> : <ReactSVG src={eyeSlash} />}
            </a>
        </div>
    )
}
