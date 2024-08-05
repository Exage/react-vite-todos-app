import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.scss'

import { Sidebar } from './components/Sidebar'

import { Home } from './pages/Home'
import { Start } from './pages/Start'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Todo } from './pages/Todos'
import { NotFound } from './pages/NotFound'

import { useAuthContext } from './hooks/useAuthContext'
import { useToggleTheme } from './hooks/useToggleTheme'

import { UserSettings } from './pages/UserSettings'
import { Password } from './pages/UserSettings/Password'
import { Name } from './pages/UserSettings/Name'

function App() {

	const { user, loading } = useAuthContext()
	const { theme } = useToggleTheme()

	useEffect(() => {

		const changeBodyTheme = () => {
			const body = document.body

			if (body.classList.contains('light')) {
				body.classList.remove('light')
				body.classList.add('dark')
			} else {
				body.classList.remove('dark')
				body.classList.add('light')
			}
		}

		changeBodyTheme()

	}, [theme])

	if (loading) {
		return <h1 style={{ textAlign: 'center' }}>Content Loading...</h1>
	}

	return (
		<div className={`page${theme ? ` ${theme}` : ''}`}>
			<div className='wrapper'>
				<div className='App'>
					<BrowserRouter>
						<main className='main main-wrapper'>
							<Routes>

								<Route path='/' element={user ? <Home /> : <Navigate to='/start' />} />
								<Route path='/start' element={!user ? <Start /> : <Navigate to='/' />} />

								<Route path='/t/:id' element={user ? <Todo /> : <Navigate to='/login' />} />

								<Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
								<Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
								<Route path='*' element={user ? <NotFound /> : <Navigate to='/start' />} />

								<Route path='/usersettings/' element={user ? <UserSettings /> : <Navigate to='/' />}>
									<Route index element={<Navigate to='name' />} />
									<Route path='name' element={<Name />} />
									<Route path='password' element={<Password />} />
								</Route>

							</Routes>
						</main>
						<Sidebar />
					</BrowserRouter>
				</div>
			</div>
		</div>
	)
}

export default App
