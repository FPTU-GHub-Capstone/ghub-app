import { ElementType } from 'react';

import { Dashboard as DashboardComponent } from '../pages/Dashboard';
import { Login as LoginComponent } from '../pages/Login';
import { Register as RegisterComponent } from '../pages/Register';
import { Landing as LandingComponent } from '../pages/Landing';
import { Forgot as ForgotComponent } from '../pages/Forgot';
import { Games as GamesComponent } from '../pages/Games';
import { Logging } from '../pages/Logging';
import DashboardLayout from '../Layout/DashboardLayout';
import GuestLayout from '../Layout/GuestLayout';
import UsersGM from '../pages/UsersGM';
import GameDashboardLayout from '../Layout/GameDashboardLayout';
import Player from '../pages/Player';
import { Permission } from '../pages/Permission';
import NotFound from '../pages/Error/NotFound';
import ServerError from '../pages/Error/ServerError';
import { AssetPage } from '../pages/AssetPage';
import { AssetDetail } from '../pages/AssetDetail';
import PricingPlan from '../pages/PricingPlan/PricingPlan';
import { GameLevelPage } from '../pages/GameLevel';
import LoggingLayout from '../Layout/LoggingLayout';
import { GameOverview } from '../pages/GameOverview';
import { Team } from '../pages/Team';
import { GameServerPage } from '../pages/GameServers';
import { GameBillPage } from '../pages/GameBills';
import PaymentSuccess from '../pages/Payment/PaymentSuccess';
import PaymentFailed from '../pages/Payment/PaymentFailed';


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
	TEAM = 'team',
	GAME_LEVELS = 'gameLevels',
	BILLS = 'bills',
	PAYMENT_SUCCESS = 'paymentSuccess',
	PAYMENT_FAILED = 'paymentFailed',
}

type ApplicationRoutes = {
	[key in PageNames]?: AppRoute
}

export const PRIVATE_ROUTES: ApplicationRoutes  = {
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
		path: '/billing',
		component: GameBillPage,
		layout: DashboardLayout,
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
		},
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
	[PageNames.PAYMENT_FAILED]: {
		path: '/failPayment',
		component: PaymentFailed,
		layout: null,
		isPrivate: true,
		props: {
			title: 'Payment Failed',
		},
	},

};

export const PUBLIC_ROUTES: ApplicationRoutes  = {
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
	[PageNames.FORGOT]: {
		path: '/forgot-password',
		component: ForgotComponent,
		layout: GuestLayout,
		isPrivate: false,
		props: {
			title: 'Forgot Password',
		},
	},
	
};

export const COMMON_ROUTES: ApplicationRoutes  = {
	[PageNames.LANDING_PAGE]: {
		path: '/',
		component: LandingComponent,
		layout: GuestLayout,
		isPrivate: false,
		props: {
			title: 'GHUB - Manage Your Game Services',
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
};
