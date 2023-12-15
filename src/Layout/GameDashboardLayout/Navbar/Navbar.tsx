 
import * as React from 'react'
import { Box, Typography, Link } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import { styled, Theme, CSSObject, alpha } from '@mui/material/styles'
import { useParams } from 'react-router'

import NavSection from '../../../components/NavSession'
import Logo from '../../../components/Logo'

import { NavbarItems } from './Items'


const StyledAccount = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: alpha(theme.palette.grey[500], 0.12),
}))

const openedMixin = (theme: Theme): CSSObject => ({
	width: 230,
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: 230,
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


export default function Navbar() {
	const { gameId } = useParams()
	const navbarItem = NavbarItems(gameId)

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Drawer variant="permanent" open={true}>
				<Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
					<Logo />
					<Typography variant='h4' sx={{ color: 'text.secondary', ml: 2, display: 'block' }}>
						GHub
					</Typography>
				</Box>

				<Box sx={{ mb: 5, mx: 2.5, display: 'block' }}>
					<Link underline="none">
						<StyledAccount>
							<Box
								component='img'
								src='/assets/images/covers/cover_3.jpg'
								sx={{ width: 50, height: 50, cursor: 'pointer' }}
							/>

							<Box sx={{ ml: 2 }}>
								<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
									Sword Art Online: Infinity Moment
								</Typography>
							</Box>
						</StyledAccount>
					</Link>
				</Box>

				<NavSection
					data={navbarItem}
					isOpen={true}
					sx={{
						paddingRight: 3,
						'&.active': {
							color: 'common.white',
							bgcolor: 'primary.dark',
							fontWeight: 'fontWeightBold',
						},
					}}
				/>
			</Drawer>
		</Box>
	)
}
