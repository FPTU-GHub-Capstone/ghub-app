/* eslint-disable max-lines */
import React, { ElementType } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

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
import { Permission } from '../pages/Permission'
import NotFound from '../pages/Error/NotFound'
import ServerError from '../pages/Error/ServerError'
import { AssetPage } from '../pages/AssetPage'
import { AssetDetail } from '../pages/AssetDetail'
import PricingPlan from '../pages/PricingPlan/PricingPlan'
import { GameLevelPage } from '../pages/GameLevel'
import LoggingLayout from '../Layout/LoggingLayout'
import { ACCESS_TOKEN } from '../common'
import AdminDashboardLayout from '../Layout/AdminDashboardLayout'
import AdminPricing from '../pages/AdminPricing'


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
	ADMIN_GAMES = 'adminGamesPage',
	GAMES = 'myProject',
	USERS_AD = 'users',
	PERMISSION = 'permission',
	ASSETS = 'assetListPage',
	ADMIN_PAYMENT = 'adminPricing',
	PAYMENT = 'pricingPlan',
	USERS_GM = 'userGM',
	PLAYER = 'player',
	LOGGING = 'logging',
	NOT_FOUND = 'notFound',
	SERVER_ERROR = 'serverError',
	ASSETS_DETAILS = 'assetDetails',
	GAME_LEVELS = 'gameLevels'
}

type ApplicationRoutes = {
	[key in PageNames]?: AppRoute
}

export const APPLICATION_ROUTES: ApplicationRoutes  = {
	// Private Route
	[PageNames.DASHBOARD]: {
		path: '/dashboard',
		component: DashboardComponent,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'Dashboard',
		},
	},
	[PageNames.ADMIN_GAMES]: {
		path: '/admin/games',
		component: GamesComponent,
		layout: AdminDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Games Project Management',
		},
	},
	[PageNames.GAMES]: {
		path: '/games',
		component: GamesComponent,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'My Projects',
		},
	},
	[PageNames.USERS_AD]: {
		path: '/admin/users',
		component: UsersGM,
		layout: AdminDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Admin Users Management',
		},
	},
	[PageNames.USERS_GM]: {
		path: '/users',
		component: UsersGM,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'Users',
		},
	},
	[PageNames.PLAYER]: {
		path: '/games/:gameId/players',
		component: Player,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Players',
		},
	},
	[PageNames.PERMISSION]: {
		path: '/games/:gameId/permission',
		component: Permission,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Permission',
		},
	},
	[PageNames.ASSETS]: {
		path: '/games/:gameId/assets',
		component: AssetPage,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Asset Page',
		},
	},
	[PageNames.ASSETS_DETAILS]: {
		path: '/games/:gameId/assets/:assetId',
		component: AssetDetail,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Asset Detail Page',
		},
	},
	[PageNames.LOGGING]: {
		path: '/games/:gameId/logging',
		component: Logging,
		layout: LoggingLayout,
		isPrivate: true,
		props: {
			title: 'Logging',
		},
	},
	[PageNames.GAME_LEVELS]: {
		path: '/games/:gameId/levels',
		component: GameLevelPage,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Game Levels',
		},
	},
	[PageNames.ADMIN_PAYMENT]: {
		path: '/admin/pricingPlan',
		component: AdminPricing,
		layout: AdminDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Subscription Plan Management',
		},
	},
	[PageNames.PAYMENT]: {
		path: '/pricingPlan',
		component: PricingPlan,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'Subscription Plan',
		},
	},

	// Public Route
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
	[PageNames.NOT_FOUND]: {
		path: '/*',
		component: NotFound,
		layout: null,
		isPrivate: false,
		props: {
			title: 'Not Found',
		},
	},
	[PageNames.SERVER_ERROR]: {
		path: '/serverError',
		component: ServerError,
		layout: null,
		isPrivate: false,
		props: {
			title: 'Server Error',
		},
	},
}

export const AppRoutes: React.FC = () => {

	return (
		<Routes>
			{Object.entries(APPLICATION_ROUTES).map(([name, route]) => {
				const Layout: React.ElementType = route.layout ?? React.Fragment
				const Component: React.ElementType = route.component
				const isAuthenticated = localStorage.getItem(ACCESS_TOKEN) ? true : false

				// if (!isAuthenticated && route.isPrivate) {
				// 	Layout = APPLICATION_ROUTES[PageNames.LOGIN].layout
				// 	Component = APPLICATION_ROUTES[PageNames.LOGIN].component
				// } else {
				// 	Layout = route.layout ?? React.Fragment
				// 	Component = route.component
				// }
				return (
					<Route
						key={name}
						path={route.path}
						element={
							(!isAuthenticated && route.isPrivate) ? (
								<Navigate to={`${APPLICATION_ROUTES[PageNames.LOGIN].path}?redirect=${name}`} />
							) : (
								<Layout>
									<Component {...route.props} />
								</Layout>
							)

						}
					/>
				)
			})}
		</Routes>
	)
}
