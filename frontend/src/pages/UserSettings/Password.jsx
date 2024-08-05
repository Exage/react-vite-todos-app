import React, { useState } from 'react'

import { Input } from '../../components/Ui/Input'
import { InputPassword } from '../../components/Ui/InputPassword'

import { Error } from '../../components/Error'
import { Success } from '../../components/Success'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useChangePassword } from '../../hooks/useChangePassword'
import { useLogout } from '../../hooks/useLogout'

export const Password = () => {

    const { user } = useAuthContext()
    const { changePassword, error, success, isLoading } = useChangePassword()
    const { logout } = useLogout()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleSubmit = (Event) => {
        Event.preventDefault()
        changePassword(user.email, currentPassword, newPassword)
        setCurrentPassword('')
        setNewPassword('')
    }

    return (
        <form className='usersettings__form' onSubmit={handleSubmit}>

            <h2 className='usersettings__form-title'>Change password</h2>

            <Input disabled={true} value={user.email} />
            <InputPassword
                value={currentPassword}
                onChange={Event => setCurrentPassword(Event.target.value)}
                disabled={isLoading}

                placeholder='current password'
            />
            <InputPassword
                value={newPassword} 
                onChange={Event => setNewPassword(Event.target.value)}
                disabled={isLoading}

                placeholder='new password'
            />

            <button type='submit' className='btn' disabled={isLoading}>update password</button>

            {error && <Error>{error}</Error>}
            {success && <Success>{success}.
                {/* <br/> Do you want to <button className='btn-underline' onClick={handleLogout}>logout</button>? */}
            </Success>}

        </form>
    )
}
