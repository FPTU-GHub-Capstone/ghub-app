import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { PATH } from '../common/constants/path'


const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={PATH.LOGIN} Component={} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes