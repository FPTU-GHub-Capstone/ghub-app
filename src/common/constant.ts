import { ElementType } from 'react';

import { Dashboard as DashboardComponent } from '../pages/Dashboard';
import { Login as LoginComponent } from '../pages/Login';
import { Register as RegisterComponent } from '../pages/Register';
import { Forgot as ForgotComponent } from '../pages/Forgot';
import { Games as GamesComponent } from '../pages/Games';
import DashboardLayout from '../Layout/DashboardLayout';
import GuestLayout from '../Layout/GuestLayout';
import UsersGM from '../pages/UsersGM';


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
	USERS_GM = 'UserGM'
}

const pathMap = new Map<string, string>([
	[PageName.LOGIN, '/login'],
	[PageName.REGISTER, '/register'],
	[PageName.FORGOT, '/forgot'],
	[PageName.LANDING_PAGE, '/landingPage'],
	[PageName.DASHBOARD, '/dashboard'],
	[PageName.GAMES, '/dashboard/games'],
	[PageName.USERS_AD, '/dashboard/users'],
	[PageName.CLIENTS, '/dashboard/clients'],
	[PageName.PAYMENT, '/dashboard/payment'],
	[PageName.USERS_GM, '/dashboard/users']
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
		path: convertNameToPath(PageName.DASHBOARD),
		component: DashboardComponent,
		name: PageName.DASHBOARD,
		layout: DashboardLayout,
		props: {
			title: 'Dashboard',
		},
	},
	{
		path: convertNameToPath(PageName.GAMES),
		component: GamesComponent,
		name: PageName.GAMES,
		layout: DashboardLayout,
		props: {
			title: 'My Projects',
		},
	},
	{
		path: convertNameToPath(PageName.USERS_GM),
		component: UsersGM,
		name: PageName.USERS_GM,
		layout: DashboardLayout,
		props: {
			title: 'Users',
		},
	},
];

export const PublicRouters: Route[] = [
	{
		path: convertNameToPath(PageName.LOGIN),
		component: LoginComponent,
		name: PageName.LOGIN,
		layout: GuestLayout,
		props: {
			title: 'Login',
		},
	},
	{
		path: convertNameToPath(PageName.REGISTER),
		component: RegisterComponent,
		name: PageName.REGISTER,
		layout: GuestLayout,
		props: {
			title: 'Register',
		},
	},
	{
		path: convertNameToPath(PageName.FORGOT),
		component: ForgotComponent,
		name: PageName.FORGOT,
		layout: GuestLayout,
		props: {
			title: 'Forgot Password',
		},
	},
];
