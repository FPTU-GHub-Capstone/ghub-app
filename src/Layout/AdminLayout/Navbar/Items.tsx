import {  Group, Receipt  } from '@mui/icons-material'

//import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import { NavItem } from '../../../common'


// const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

export const NavbarItems: (gameId: string) => NavItem[] = (gameId) => [
	{
		title: 'Game Manager',
		path: `/games/${gameId}/admin/managers`,
		icon: <Group />,
	},
	{
		title: 'bills',
		path: `/games/${gameId}/bills`,
		icon: <Receipt />,
	},
	
]
