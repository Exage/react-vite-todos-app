import React, { useState } from 'react'

import { Input } from '../../components/Ui/Input'

import { Error } from '../../components/Error'
import { Success } from '../../components/Success'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useChangeName } from '../../hooks/useChangeName'

export const Name = () => {

    const { user } = useAuthContext()
    const { changeName, error, success, isLoading } = useChangeName()

    const [newName, setNewName] = useState('')

    const handleSubmit = (Event) => {
        Event.preventDefault()
        changeName(user.email, user.name, newName)
        setNewName('')
    }

    return (
        <form className='usersettings__form' onSubmit={handleSubmit}>

            <h2 className='usersettings__form-title'>Change name</h2>

            <Input disabled={true} value={user.name} />
            <Input
                value={newName}
                onChange={Event => setNewName(Event.target.value)}

                placeholder='New Name'
                disabled={isLoading}
            />

            <button type='submit' className='btn' disabled={isLoading}>update name</button>

            {error && <Error>{error}</Error>}
            {success && <Success>{success}</Success>}

        </form>
    )
}
