import { ElementType } from 'react';

import { Dashboard as DashboardComponent } from '../pages/Dashboard';
import { Login as LoginComponent } from '../pages/Login';
import { Register as RegisterComponent } from '../pages/Register';
import { Landing as LandingComponent } from '../pages/Landing';
import { Games as GamesComponent } from '../pages/Games';
import DashboardLayout from '../Layout/DashboardLayout';
import GuestLayout from '../Layout/GuestLayout';


export const enum PageName {
	LOGIN = 'Login',
	REGISTER = 'Register',
	LANDING_PAGE = 'LandingPage',
	DASHBOARD = 'Dashboard',
	GAMES = 'MyProject',
	USERS = 'Users',
	CLIENTS = 'Client',
	PAYMENT = 'PaymentPlan'
}

const pathMap = new Map<string, string>([
	[PageName.LOGIN, '/login'],
	[PageName.REGISTER, '/register'],
	[PageName.LANDING_PAGE, '/landingPage'],
	[PageName.DASHBOARD, '/dashboard'],
	[PageName.GAMES, '/dashboard/games'],
	[PageName.USERS, '/dashboard/users'],
	[PageName.CLIENTS, '/dashboard/clients'],
	[PageName.PAYMENT, '/dashboard/payment']
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
		path: convertNameToPath(PageName.LANDING_PAGE),
		component: LandingComponent,
		name: PageName.LANDING_PAGE,
		layout: GuestLayout,
		props: {
			title: 'GHUB - Manage Your Game Services',
		},
	},
];
