import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { InputEmail } from '../components/Ui/InputEmail'
import { InputPassword } from '../components/Ui/InputPassword'
import { useLogin } from '../hooks/useLogin'

import { Error } from '../components/Error'

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (Event) => {
        Event.preventDefault()

        await login(email, password)
    }

    return (
        <div className='form__wrapper'>
            <form onSubmit={handleSubmit} className='form'>

                <h1 className='form__title'>Log in</h1>

                <div className='form__inputs'>
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
                </div>

                <button type='submit' className='btn form__btn' disabled={isLoading}>submit</button>

                <p className='form__bottom-text'>
                    or try&nbsp;
                    <Link to='/signup'>
                        sign up
                    </Link>
                </p>

                {error && <Error>{error}</Error>}

            </form>
        </div>
    )
}
