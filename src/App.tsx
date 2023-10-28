import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { store } from './redux/store.ts'
import { AppRoutes } from './routes'
import ThemeProvider from './theme'
import pusherService from './services/PusherService.ts'


function App() {
	pusherService.bindEvents()
	return (
		<>
			<React.StrictMode>
				<Provider store={store}>
					<ThemeProvider>
						<Router>
							<AppRoutes />
						</Router>
					</ThemeProvider>	
				</Provider>
			</React.StrictMode>
		</>
	)
}

export default App
