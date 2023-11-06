import { NavItem } from '../../../common'
import SvgColor from '../../../components/Svg-color'


const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

export const sidebarItems: Record<string, NavItem[]> = {
	admin: [
		{
			title: 'dashboard',
			path: '/dashboard',
			icon: icon('ic_home'),
		},
		{
			title: 'users',
			path: '/dashboard/users',
			icon: icon('ic_user'),
		},
		{
			title: 'payment plan',
			path: '/dashboard/payment',
			icon: icon('ic_payment'),
		},
	],
	gameManager: [
		{
			title: 'my projects',
			path: '/dashboard/games',
			icon: icon('ic_home'),
		},
		{
			title: 'users',
			path: '/dashboard/users',
			icon: icon('ic_user'),
		},
		{
			title: 'clients',
			path: '/clients',
			icon: icon('ic_client'),
		},
		{
			title: 'payment plan',
			path: '/dashboard/payment',
			icon: icon('ic_payment'),
		},
	],
	other: [
		{
			title: 'logout',
			path: '/',
			icon: icon('ic_logout')
		}
	]
}
