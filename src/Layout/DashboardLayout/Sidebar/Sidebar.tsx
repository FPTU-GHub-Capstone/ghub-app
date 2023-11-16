import * as React from 'react'
import { styled, Theme, CSSObject , alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Link, Avatar } from '@mui/material'

import Logo from '../../../components/Logo'
import { account } from '../../../mock/account'
import NavSection from '../../../components/NavSession'

import { sidebarItems } from './Items'


const drawerWidth = 230

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
)

const StyledAccount = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: alpha(theme.palette.grey[500], 0.12),
}))

export default function Sidebar({isOpen, setIsOpen} : {
	isOpen: boolean,
	setIsOpen: (open) => void,
}) {

	const handleDrawerOpen = () => {
		setIsOpen(true)
	}

	const handleDrawerClose = () => {
		setIsOpen(false)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />

			<Drawer variant="permanent" open={isOpen}>
				<DrawerHeader>
					<IconButton onClick={isOpen ? handleDrawerClose : handleDrawerOpen}>
						{isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Box sx={{ px: isOpen ? 2.5 : 1.5, pb: 3, display: 'inline-flex' }}>
					<Logo />
					<Typography variant='h4' sx={{ color: 'text.secondary', ml: 2, display: isOpen ? 'block' : 'none' }}>
						GHub
					</Typography>
				</Box>

				<Box sx={{ mb: 5, mx: 2.5, display: isOpen ? 'block' : 'none' }}>
					<Link underline="none">
						<StyledAccount>
							<Avatar src={account.avatar} alt="photoURL" />

							<Box sx={{ ml: 2 }}>
								<Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
									{`${account.firstName} ${account.lastName}`}
								</Typography>

								<Typography variant="body2" sx={{ color: 'text.secondary' }}>
									{account.role}
								</Typography>
							</Box>
						</StyledAccount>
					</Link>
				</Box>
				<Divider />

				<NavSection 
					data={sidebarItems.gameManager} 
					isOpen={isOpen} 
					sx={{
						justifyContent: isOpen ? 'initial' : 'center',
						'&.active': {
							bgcolor: 'action.selected',
						},
					}} 
				/>
				
				<Divider />
				<Box sx={{ position: 'absolute', bottom: 0, width: '100%', pb: 3,}}>
					<NavSection 
						data={sidebarItems.other} 
						isOpen={isOpen} 
						sx={{ 
							backgroundColor: 'action.active', 
							color: 'common.white',
							justifyContent: isOpen ? 'initial' : 'center',
						}} />
				</Box>
			</Drawer>

			
			
		</Box>
	)
}
