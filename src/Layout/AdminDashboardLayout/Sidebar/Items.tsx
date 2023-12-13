import { NavItem } from '../../../common'
import SvgColor from '../../../components/Svg-color'


const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

export const sidebarItems: Record<string, NavItem[]> = {
	admin: [
		{
			title: 'Game Projects',
			path: '/admin/games',
			icon: icon('ic_home'),
		},
		{
			title: 'Game Managers Users',
			path: '/admin/users',
			icon: icon('ic_user'),
		},
		{
			title: 'subscription plan',
			path: '/admin/pricingPlan',
			icon: icon('ic_payment'),
		},
	],
	gameManager: [
		{
			title: 'my projects',
			path: '/games',
			icon: icon('ic_home'),
		},
		{
			title: 'users',
			path: '/users',
			icon: icon('ic_user'),
		},
		{
			title: 'subscription plan',
			path: '/pricingPlan',
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
