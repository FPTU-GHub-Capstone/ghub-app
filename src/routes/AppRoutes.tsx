import React, { ElementType } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Dashboard as DashboardComponent } from '../pages/Dashboard'
import { Login as LoginComponent } from '../pages/Login'
import { Register as RegisterComponent } from '../pages/Register'
import { Landing as LandingComponent } from '../pages/Landing'
import { Forgot as ForgotComponent } from '../pages/Forgot'
import { Games as GamesComponent } from '../pages/Games'
import { Logging } from '../pages/Logging'
import DashboardLayout from '../Layout/DashboardLayout'
import GuestLayout from '../Layout/GuestLayout'
import UsersGM from '../pages/UsersGM'
import GameDashboardLayout from '../Layout/GameDashboardLayout'
import Player from '../pages/Player'
import { Clients } from '../pages/Clients'


type AppRoute = {
	path: string,
	component: ElementType,
	layout: ElementType,
	isPrivate: boolean,
	props?: Record<string, unknown>,
};

export const enum PageNames {
	LOGIN = 'login',
	REGISTER = 'register',
	FORGOT = 'forgotPassword',
	LANDING_PAGE = 'landingPage',
	DASHBOARD = 'dashboard',
	GAMES = 'myProject',
	USERS_AD = 'users',
	CLIENTS = 'client',
	PAYMENT = 'paymentPlan',
	USERS_GM = 'userGM',
	PLAYER = 'player',
	LOGGING = 'logging',
}


export const APPLICATION_ROUTES: Record<string, AppRoute>  = {
	[PageNames.DASHBOARD]: {
		path: '/dashboard',
		component: DashboardComponent,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'Dashboard',
		},
	},
	[PageNames.GAMES]: {
		path: '/dashboard/games',
		component: GamesComponent,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'My Projects',
		},
	},
	[PageNames.USERS_GM]: {
		path: '/dashboard/users',
		component: UsersGM,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'Users',
		},
	},
	[PageNames.PLAYER]: {
		path: '/game/players',
		component: Player,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Players',
		},
	},
	[PageNames.CLIENTS]: {
		path: '/clients',
		component: Clients,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'Clients',
		},
	},
	[PageNames.LOGGING]: {
		path: '/dashboard/logging',
		component: Logging,
		layout: GuestLayout,
		isPrivate: true,
		props: {
			title: 'Logging',
		},
	},
	[PageNames.LOGIN]: {
		path: '/login',
		component: LoginComponent,
		layout: GuestLayout,
		isPrivate: false,
		props: {
			title: 'Login',
		},
	},
	[PageNames.REGISTER]: {
		path: '/register',
		component: RegisterComponent,
		layout: GuestLayout,
		isPrivate: false,
		props: {
			title: 'Register',
		},
	},
	[PageNames.LANDING_PAGE]: {
		path: '/',
		component: LandingComponent,
		layout: GuestLayout,
		isPrivate: false,
		props: {
			title: 'GHUB - Manage Your Game Services',
		},
	},
	[PageNames.FORGOT]: {
		path: '/forgot-password',
		component: ForgotComponent,
		layout: GuestLayout,
		isPrivate: false,
		props: {
			title: 'Forgot Password',
		},
	},
}

export const AppRoutes: React.FC = () => {
	return (
		<Routes>
			{Object.entries(APPLICATION_ROUTES).map(([name, route]) => {
				const Layout = route.layout ?? React.Fragment
				const Component = route.component
				return (
					<Route
						key={name}
						path={route.path}
						element={
							<Layout {...route.props}>
								<Component {...route.props} />
							</Layout>
						}
					/>
				)
			})}
		</Routes>
	)
}
