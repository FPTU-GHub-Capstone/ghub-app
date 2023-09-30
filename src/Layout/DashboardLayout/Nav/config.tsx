// component
import { AppPath } from '../../../common'
import SvgColor from '../../../components/Svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

const navConfig = [
	{
		title: 'dashboard',
		path: '/dashboard',
		icon: icon('ic_home'),
	},
	{
		title: 'user',
		path: '/dashboard/user',
		icon: icon('ic_user'),
	},
	{
		title: 'product',
		path: '/dashboard/products',
		icon: icon('ic_cart'),
	},
	{
		title: 'blog',
		path: '/dashboard/blog',
		icon: icon('ic_blog'),
	},
	{
		title: 'login',
		path: '/login',
		icon: icon('ic_lock'),
	},
	{
		title: 'Not found',
		path: '/404',
		icon: icon('ic_disabled'),
	},
]

export default navConfig
