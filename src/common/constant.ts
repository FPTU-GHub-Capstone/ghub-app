import { ElementType } from 'react';

import { MainLayout } from '../components/Layout';
import { Dashboard as DashboardComponent } from '../pages/Dashboard';
import { Login as LoginComponent } from '../pages/Login';
import { Register as RegisterComponent } from '../pages/Register';


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
		layout: MainLayout,
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
		layout: MainLayout,
		props: {
			title: 'Login',
		},
	},
	{
		path: AppPath.Register,
		component: RegisterComponent,
		name: 'Register',
		layout: MainLayout,
		props: {
			title: 'Register',
		},
	},
];