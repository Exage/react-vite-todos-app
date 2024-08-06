import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import './index.scss'

import { AuthContextProvider } from './context/AuthContext.jsx'
import { TodosContextProvider } from './context/TodosContext.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { MenuContextProvider } from './context/MenuContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContextProvider>
			<TodosContextProvider>
				<ThemeContextProvider>
					<MenuContextProvider>
						<App />
					</MenuContextProvider>
				</ThemeContextProvider>
			</TodosContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
