/* eslint-disable max-lines */
import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { ACCESS_TOKEN } from '../common'

import { COMMON_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES, PageNames } from './Routes'


const PrivateRoute: React.FunctionComponent = () => {
	return localStorage.getItem(ACCESS_TOKEN) ? (
		<Outlet />
	) : (
		<Navigate to={PUBLIC_ROUTES[PageNames.LOGIN].path} />
	)
}

const PublicRoute: React.FunctionComponent = () => {
	return localStorage.getItem(ACCESS_TOKEN) ? (
		<Navigate to={PRIVATE_ROUTES[PageNames.GAMES].path} />
	) : (
		<Outlet />
	)
}

export const AppRoutes: React.FC = () => {
	return (
		<Routes>
			{Object.entries(COMMON_ROUTES).map(([name, route]) => {
				const Layout: React.ElementType = route.layout ?? React.Fragment
				const Component: React.ElementType = route.component

				return (
					<Route
						key={name}
						path={route.path}
						element={
							<Layout>
								<Component {...route.props} />
							</Layout>
						}
					/>
				)
			})}
			<Route path="/" element={<PrivateRoute />}>
				{Object.entries(PRIVATE_ROUTES).map(([name, route]) => {
					const Layout: React.ElementType = route.layout ?? React.Fragment
					const Component: React.ElementType = route.component

					return (
						<Route
							key={name}
							path={route.path}
							element={
								<Layout>
									<Component {...route.props} />
								</Layout>
							}
						/>
					)
				})}
			</Route>

			<Route path="/" element={<PublicRoute />}>
				{Object.entries(PUBLIC_ROUTES).map(([name, route]) => {
					const Layout: React.ElementType = route.layout ?? React.Fragment
					const Component: React.ElementType = route.component

					return (
						<Route
							key={name}
							path={route.path}
							element={
								<Layout>
									<Component {...route.props} />
								</Layout>
							}
						/>
					)
				})}
			</Route>

		</Routes>
	)
}
