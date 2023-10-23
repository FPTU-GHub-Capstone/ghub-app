import { ElementType } from 'react';

import { Dashboard as DashboardComponent } from '../pages/Dashboard';
import { Login as LoginComponent } from '../pages/Login';
import { Register as RegisterComponent } from '../pages/Register';
import { Landing as LandingComponent } from '../pages/Landing';
import { Forgot as ForgotComponent } from '../pages/Forgot';
import { Games as GamesComponent } from '../pages/Games';
import DashboardLayout from '../Layout/DashboardLayout';
import GuestLayout from '../Layout/GuestLayout';
import UsersGM from '../pages/UsersGM';
import GameDashboardLayout from '../Layout/GameDashboardLayout';
import Player from '../pages/Player';


export const enum PageName {
	LOGIN = 'Login',
	REGISTER = 'Register',
	FORGOT = 'ForgotPassword',
	LANDING_PAGE = 'LandingPage',
	DASHBOARD = 'Dashboard',
	GAMES = 'MyProject',
	USERS_AD = 'Users',
	CLIENTS = 'Client',
	PAYMENT = 'PaymentPlan',
	USERS_GM = 'UserGM',
	PLAYER = 'Player'
}

const pathMap = new Map<string, string>([
	[PageName.LOGIN, '/login'],
	[PageName.REGISTER, '/register'],
	[PageName.FORGOT, '/forgot-password'],
	[PageName.LANDING_PAGE, '/'],
	[PageName.DASHBOARD, '/dashboard'],
	[PageName.GAMES, '/dashboard/games'],
	[PageName.USERS_AD, '/dashboard/users'],
	[PageName.CLIENTS, '/dashboard/clients'],
	[PageName.PAYMENT, '/dashboard/payment'],
	[PageName.USERS_GM, '/dashboard/users'],
	[PageName.PLAYER, '/dashboard/players']
]);

export const convertNameToPath = (pageName: PageName) => pathMap.get(pageName) ?? '/';

type Route = {
	path: string,
	component: ElementType,
	name: string,
	layout: ElementType,
	props?: Record<string, unknown>,
}

export const PrivateRouters: Route[] = [
	{
		path: '/dashboard',
		component: DashboardComponent,
		name: PageName.DASHBOARD,
		layout: DashboardLayout,
		props: {
			title: 'Dashboard',
		},
	},
	{
		path: '/dashboard/games',
		component: GamesComponent,
		name: PageName.GAMES,
		layout: DashboardLayout,
		props: {
			title: 'My Projects',
		},
	},
	{
		path: '/dashboard/users',
		component: UsersGM,
		name: PageName.USERS_GM,
		layout: DashboardLayout,
		props: {
			title: 'Users',
		},
	},
	{
		path: '/dashboard/players',
		component: Player,
		name: PageName.PLAYER,
		layout: GameDashboardLayout,
		props: {
			title: 'Players',
		},
	},
];

export const PublicRouters: Route[] = [
	{
		path: '/login',
		component: LoginComponent,
		name: PageName.LOGIN,
		layout: GuestLayout,
		props: {
			title: 'Login',
		},
	},
	{
		path: '/register',
		component: RegisterComponent,
		name: PageName.REGISTER,
		layout: GuestLayout,
		props: {
			title: 'Register',
		},
	},
	{
		path: '/',
		component: LandingComponent,
		name: PageName.LANDING_PAGE,
		layout: GuestLayout,
		props: {
			title: 'GHUB - Manage Your Game Services',
		},
	},
	{
		path: '/forgot-password',
		component: ForgotComponent,
		name: PageName.FORGOT,
		layout: GuestLayout,
		props: {
			title: 'Forgot Password',
		},
	},
];
