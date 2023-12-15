import Diversity2Icon from '@mui/icons-material/Diversity2'
import PersonIcon from '@mui/icons-material/Person'
import CategoryIcon from '@mui/icons-material/Category'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import EngineeringIcon from '@mui/icons-material/Engineering'
import StorageIcon from '@mui/icons-material/Storage'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ReceiptIcon from '@mui/icons-material/Receipt'

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
		title: 'bills',
		path: `/games/${gameId}/bills`,
		icon: <ReceiptIcon />,
	},
	{
		title: 'servers',
		path: `/games/${gameId}/servers`,
		icon: <StorageIcon />,
	},
	{
		title: 'team',
		path: `/games/${gameId}/team`,
		icon: <Diversity2Icon />,
	},
	// {
	// 	title: 'servers',
	// 	path: `/games/${gameId}/servers`,
	// 	icon: <StorageIcon />,
	// },
	{
		title: 'players',
		path: `/games/${gameId}/players`,
		icon: <PersonIcon />,
	},
	// {
	// 	title: 'characters',
	// 	path: `/games/${gameId}/characters`,
	// 	icon: <ParaglidingIcon />,
	// },
	{
		title: 'assets',
		path: `/games/${gameId}/assets`,
		icon: <CategoryIcon />,
	},
	// {
	// 	title: 'activities',
	// 	path: `/games/${gameId}/activities`,
	// 	icon: <DirectionsRunIcon />,
	// },
	{
		title: 'Game Levels',
		path: `/games/${gameId}/levels`,
		icon: <ArrowUpwardIcon />,
	},
]
