import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { store } from './redux/store.ts'
import { AppRoutes } from './routes'


function App() {

	return (
		<>
			<React.StrictMode>
				<Provider store={store}>
					<Router>
						<AppRoutes />
					</Router>
				</Provider>
			</React.StrictMode>
		</>
	)
}

export default App
