import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material'

import { account } from '../../../mock/account'
import useResponsive from '../../../hooks/useResponsive'
import Logo from '../../../components/Logo'
import Scrollbar from '../../../components/Scrollbar'
import NavSection from '../../../components/NavSession'

import sidebarItems from './Items'


const NAV_WIDTH = 280

const StyledAccount = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: alpha(theme.palette.grey[500], 0.12),
}))

const renderContent = (
	<Scrollbar
		sx={{
			height: 'auto',
			'& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
		}}
	>
		<Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
			<Logo />
			<Typography variant='h4' sx={{ color: 'text.secondary', ml: 2 }}>
				GHub
			</Typography>
		</Box>

		<Box sx={{ mb: 5, mx: 2.5 }}>
			<Link underline="none">
				<StyledAccount>
					<Avatar src={account.photoURL} alt="photoURL" />

					<Box sx={{ ml: 2 }}>
						<Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
							{account.displayName}
						</Typography>

						<Typography variant="body2" sx={{ color: 'text.secondary' }}>
							{account.role}
						</Typography>
					</Box>
				</StyledAccount>
			</Link>
		</Box>

		<NavSection data={sidebarItems.gameManager} />

		<Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
			<Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
				<Button href="/" target="_blank" variant="outlined">
					Logout
				</Button>
			</Stack>
		</Box>
	</Scrollbar>
)

type Props = {
	openNav: boolean,
	onCloseNav: () => void,
}

export default function Sidebar({ openNav, onCloseNav }: Props) {
	const { pathname } = useLocation()

	const isDesktop = useResponsive('up', 'lg')

	useEffect(() => {
		if (openNav) {
			onCloseNav()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	return (
		<Box
			component="nav"
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV_WIDTH },
			}}
		>
			{isDesktop ? (
				<Drawer
					open
					variant="permanent"
					PaperProps={{
						sx: {
							width: NAV_WIDTH,
							bgcolor: 'background.default',
							borderRightStyle: 'solid',
						},
					}}
				>
					{renderContent}
				</Drawer>
			) : (
				<Drawer
					open={openNav}
					onClose={onCloseNav}
					ModalProps={{
						keepMounted: true,
					}}
					PaperProps={{
						sx: { width: NAV_WIDTH },
					}}
				>
					{renderContent}
				</Drawer>
			)}
		</Box>
	)
}