import StorageIcon from '@mui/icons-material/Storage'
import PersonIcon from '@mui/icons-material/Person'
import ParaglidingIcon from '@mui/icons-material/Paragliding'
import CategoryIcon from '@mui/icons-material/Category'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import EngineeringIcon from '@mui/icons-material/Engineering'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'

import { NavItem } from '../../../common'


// const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

export const NavbarItems: (gameId: string) => NavItem[] = (gameId) => [
	{
		title: 'permission',
		path: `/games/${gameId}/permission`,
		icon: <EngineeringIcon />,
	},
	{
		title: 'monitor',
		path: `/games/${gameId}/logging`,
		icon: <QueryStatsIcon />,
	},
	{
		title: 'servers',
		path: `/games/${gameId}/servers`,
		icon: <StorageIcon />,
	},
	{
		title: 'players',
		path: `/games/${gameId}/players`,
		icon: <PersonIcon />,
	},
	{
		title: 'characters type',
		path: `/games/${gameId}/character-types`,
		icon: <ParaglidingIcon />,
	},
	{
		title: 'assets',
		path: `/games/${gameId}/assets`,
		icon: <CategoryIcon />,
	},
	{
		title: 'activities',
		path: `/games/${gameId}/activities`,
		icon: <DirectionsRunIcon />,
	},
]
