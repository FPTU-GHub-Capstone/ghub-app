import { ElementType } from 'react';

import { Dashboard as DashboardComponent } from '../pages/Dashboard';
import { Login as LoginComponent } from '../pages/Login';
import { Register as RegisterComponent } from '../pages/Register';
import DashboardLayout from '../Layout/DashboardLayout';
import GuestLayout from '../Layout/GuestLayout';


export const enum AppPath {
	Login = '/login',
	Register = '/register',
	LandingPage = '/landingPage',
	Dashboard = '/dashboard',
}

type Route = {
	path: string,
	component: ElementType,
	name: string,
	layout: ElementType,
	props?: any,
}

export const PrivateRouters: Route[] = [
	{
		path: AppPath.Dashboard,
		component: DashboardComponent,
		name: 'Dashboard',
		layout: DashboardLayout,
		props: {
			title: 'Dashboard',
		},
	},
];

export const PublicRouters: Route[] = [
	{
		path: AppPath.Login,
		component: LoginComponent,
		name: 'Login',
		layout: GuestLayout,
		props: {
			title: 'Login',
		},
	},
	{
		path: AppPath.Register,
		component: RegisterComponent,
		name: 'Register',
		layout: GuestLayout,
		props: {
			title: 'Register',
		},
	},
];