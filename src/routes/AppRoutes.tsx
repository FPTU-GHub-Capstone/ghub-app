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
import { GameOverview } from '../pages/GameOverview'
import { ACCESS_TOKEN } from '../common'
import { Team } from '../pages/Team'
import { GameServerPage } from '../pages/GameServers'
import { GameBillPage } from '../pages/GameBills'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'


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
	OVERVIEW = 'overview',
	USERS_AD = 'users',
	PERMISSION = 'permission',
	GAME_SERVER = 'gameServerPage',
	ASSETS = 'assetListPage',
	PAYMENT = 'pricingPlan',
	USERS_GM = 'userGM',
	PLAYER = 'player',
	LOGGING = 'logging',
	NOT_FOUND = 'notFound',
	SERVER_ERROR = 'serverError',
	ASSETS_DETAILS = 'assetDetails',
	GAME_LEVELS = 'gameLevels',
	BILLS = 'bills',
	PAYMENT_SUCCESS = 'paymentSuccess',
	TEAM = 'team',
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
	[PageNames.GAMES]: {
		path: '/games',
		component: GamesComponent,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'My Projects',
		},
	},
	[PageNames.OVERVIEW]: {
		path: '/games/:gameId/overview',
		component: GameOverview,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Game Overview',
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
	[PageNames.BILLS]: {
		path: '/games/:gameId/bills',
		component: GameBillPage,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Bills',
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
	[PageNames.GAME_SERVER]: {
		path: '/games/:gameId/servers',
		component: GameServerPage,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Game Servers',
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
	[PageNames.PAYMENT]: {
		path: '/pricingPlan',
		component: PricingPlan,
		layout: DashboardLayout,
		isPrivate: true,
		props: {
			title: 'Subscription Plan',
		},
	},
	[PageNames.TEAM]: {
		path: '/games/:gameId/team',
		component: Team,
		layout: GameDashboardLayout,
		isPrivate: true,
		props: {
			title: 'Team',
		}
	},
	[PageNames.PAYMENT_SUCCESS]: {
		path: '/successPayment',
		component: PaymentSuccess,
		layout: null,
		isPrivate: true,
		props: {
			title: 'Successful Payment',
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

				return (
					<Route
						key={name}
						path={route.path}
						element={
							(!localStorage.getItem(ACCESS_TOKEN) && route.isPrivate) ? (
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
