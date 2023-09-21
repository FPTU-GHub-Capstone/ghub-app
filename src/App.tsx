import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Login } from './pages/Login'
import { DevNav } from './pages/DevNav'
import { Error } from './pages/Error'
import { Register } from './pages/Register'


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index Component={DevNav} />
						<Route path="login" Component={Login} />
						<Route path="register" Component={Register} />
						<Route path="error" Component={Error} />
						<Route path="*" element={<Navigate to="/error" replace />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
