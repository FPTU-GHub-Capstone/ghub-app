import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { store } from './redux/store.ts'
import { AppRoutes } from './routes'
import ThemeProvider from './theme'


function App() {

	return (
		<>
			<React.StrictMode>
				<GoogleOAuthProvider clientId="146915751230-2m5s6ppfpoe96clg41kt18tqq4lr2dle.apps.googleusercontent.com">
					<Provider store={store}>
						<ThemeProvider>
							<Router>
								<AppRoutes />
							</Router>
						</ThemeProvider>	
					</Provider>
				</GoogleOAuthProvider>
			</React.StrictMode>
		</>
	)
}

export default App
