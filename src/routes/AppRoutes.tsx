import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppPath } from '../common'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'


const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppPath.Login} Component={Login} />
				<Route path={AppPath.Register} Component={Register} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes