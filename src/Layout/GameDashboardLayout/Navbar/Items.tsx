import StorageIcon from '@mui/icons-material/Storage'
import PersonIcon from '@mui/icons-material/Person'
import ParaglidingIcon from '@mui/icons-material/Paragliding'
import CategoryIcon from '@mui/icons-material/Category'

import { NavItem } from '../../../common'
import SvgColor from '../../../components/Svg-color'


const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

export const navbarItems: NavItem[] = [

	{
		title: 'servers',
		path: '/game/servers',
		icon: <StorageIcon />,
	},
	{
		title: 'players',
		path: '/game/players',
		icon: <PersonIcon />,
	},
	{
		title: 'characters',
		path: '/game/characters',
		icon: <ParaglidingIcon />,
	},
	{
		title: 'assets',
		path: '/game/assets',
		icon: <CategoryIcon />,
	},

]
