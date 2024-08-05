import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Input } from '../components/Ui/Input'
import { InputEmail } from '../components/Ui/InputEmail'
import { InputPassword } from '../components/Ui/InputPassword'
import { useSignup } from '../hooks/useSignup'

import { Error } from '../components/Error'

export const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (Event) => {
        Event.preventDefault()

        await signup(name, email, password, passwordConfirm)
    }

    return (
        <div className='form__wrapper'>
            <form onSubmit={handleSubmit} className='form'>

                <h1 className='form__title'>Sign up</h1>

                <div className='form__inputs'>
                    <Input
                        placeholder='what is your name'
                        value={name}
                        onChange={Event => setName(Event.target.value)}
                        disabled={isLoading}
                    />
                    <InputEmail
                        placeholder='your email'
                        value={email}
                        onChange={Event => setEmail(Event.target.value)}
                        disabled={isLoading}
                    />
                    <InputPassword
                        placeholder='password'
                        value={password}
                        onChange={Event => setPassword(Event.target.value)}
                        disabled={isLoading}
                    />
                    <InputPassword
                        placeholder='confirm password'
                        value={passwordConfirm}
                        onChange={Event => setPasswordConfirm(Event.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <button type='submit' className='btn form__btn' disabled={isLoading}>submit</button>

                <p className='form__bottom-text'>
                    or try&nbsp;
                    <Link to='/login'>
                        login
                    </Link>
                </p>

                {error && <Error>{error}</Error>}

            </form>
        </div>
    )
}
