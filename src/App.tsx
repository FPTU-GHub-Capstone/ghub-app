import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { store } from './redux/store'
import { AppRoutes } from './routes'
import ThemeProvider from './theme'
import 'react-toastify/dist/ReactToastify.css'


function App() {
	return (
		<>
			<React.StrictMode>
				<Provider store={store}>
					<ThemeProvider>
						<Router>
							<AppRoutes />
							<ToastContainer />
						</Router>
					</ThemeProvider>	
				</Provider>
			</React.StrictMode>
		</>
	)
}

export default App
