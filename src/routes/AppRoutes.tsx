import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PrivateRouters, PublicRouters } from '../common'
import { Login } from '../pages/Login'


export const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" Component={Login} />
			<Route path="/login" Component={Login} />
			{PrivateRouters.map((route) => {
				const Layout = route.layout ?? React.Fragment
				const Component = route.component
				return (
					<Route
						key={route.name}
						path={route.path}
						element={
							<Layout {...route.props}>
								<Component {...route.props}/>
							</Layout>
						}
					/>
				)
			})}
			{PublicRouters.map((route) => {
				const Layout = route.layout ?? React.Fragment
				const Component = route.component
				return (
					<Route
						key={route.name}
						path={route.path}
						element={
							<Layout {...route.props}>
								<Component />
							</Layout>
						}
					/>
				)
			})}
			{/* <Route path={AppPath.Login} Component={Login} />
			<Route path={AppPath.Register} Component={Register} />
			<Route path={AppPath.Dashboard} Component={Dashboard} /> */}
		</Routes>
	)
}
