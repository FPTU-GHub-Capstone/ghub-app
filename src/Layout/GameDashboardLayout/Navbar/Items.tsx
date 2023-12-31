import Diversity2Icon from '@mui/icons-material/Diversity2'
import PersonIcon from '@mui/icons-material/Person'
import CategoryIcon from '@mui/icons-material/Category'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import EngineeringIcon from '@mui/icons-material/Engineering'
import HomeIcon from '@mui/icons-material/Home'
import WalletIcon from '@mui/icons-material/Wallet'
import { Article } from '@mui/icons-material'
import ParaglidingIcon from '@mui/icons-material/Paragliding'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import StorageIcon from '@mui/icons-material/Storage'

import { NavItem } from '../../../common'


// const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

export const NavbarItems: (gameId: string) => NavItem[] = (gameId) => [
	{
		title: 'Back to My Projects',
		path: '/games/',
		icon: <HomeIcon />,
	},
	{
		title: 'overview',
		path: `/games/${gameId}/overview`,
		icon: <Article />,
	},
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
		title: 'team',
		path: `/games/${gameId}/team`,
		icon: <Diversity2Icon />,
	},
	{
		title: 'servers',
		path: `/games/${gameId}/servers`,
		icon: <StorageIcon />,
	},
	{
		title: 'character class',
		path: `/games/${gameId}/characterType`,
		icon: <ParaglidingIcon />,
	},
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
	{
		title: 'asset types',
		path: `/games/${gameId}/assetTypes`,
		icon: <CategoryIcon />,
	},
	{
		title: 'activities',
		path: `/games/${gameId}/activities`,
		icon: <DirectionsRunIcon />,
	},
	{
		title: 'activities types',
		path: `/games/${gameId}/activitiesTypes`,
		icon: <DirectionsRunIcon />,
	},
	{
		title: 'Game Levels',
		path: `/games/${gameId}/levels`,
		icon: <ArrowUpwardIcon />,
	},
	{
		title: 'Wallet Category',
		path: `/games/${gameId}/walletCategory`,
		icon: <WalletIcon />,
	},
]
