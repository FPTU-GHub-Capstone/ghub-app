import { ElementType } from 'react';

import { Dashboard as DashboardComponent } from '../pages/Dashboard';
import { Login as LoginComponent } from '../pages/Login';
import { Register as RegisterComponent } from '../pages/Register';
import { Games as GamesComponent } from '../pages/Games';
import DashboardLayout from '../Layout/DashboardLayout';
import GuestLayout from '../Layout/GuestLayout';


export const PageName = Object.freeze({
	LOGIN: 'Login',
	REGISTER: 'Register',
	LANDING_PAGE: 'LandingPage',
	DASHBOARD: 'Dashboard',
	GAMES: 'MyProject',
	USERS: 'Users',
	CLIENTS: 'Client',
	PAYMENT: 'PaymentPlan'
});

export const AppPath = (pageName: string) => {
	const path = {
		[PageName.LOGIN]: '/login',
		[PageName.REGISTER]: '/register',
		[PageName.LANDING_PAGE]: '/landingPage',
		[PageName.DASHBOARD]: '/dashboard',
		[PageName.GAMES]: '/dashboard/games',
		[PageName.USERS]: '/dashboard/users',
		[PageName.CLIENTS]: '/dashboard/clients',
		[PageName.PAYMENT]: '/dashboard/payment'
	};

	return path[pageName];
};

type Route = {
	path: string,
	component: ElementType,
	name: string,
	layout: ElementType,
	props?: any,
}

export const PrivateRouters: Route[] = [
	{
		path: AppPath(PageName.DASHBOARD),
		component: DashboardComponent,
		name: PageName.DASHBOARD,
		layout: DashboardLayout,
		props: {
			title: 'Dashboard',
		},
	},
	{
		path: AppPath(PageName.GAMES),
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
		path: AppPath(PageName.LOGIN),
		component: LoginComponent,
		name: PageName.LOGIN,
		layout: GuestLayout,
		props: {
			title: 'Login',
		},
	},
	{
		path: AppPath(PageName.REGISTER),
		component: RegisterComponent,
		name: PageName.REGISTER,
		layout: GuestLayout,
		props: {
			title: 'Register',
		},
	},
];