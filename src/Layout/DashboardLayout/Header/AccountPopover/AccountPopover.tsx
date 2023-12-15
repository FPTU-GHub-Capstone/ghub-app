/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { alpha } from '@mui/material/styles'
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material'
// mocks_
// import { account } from '../../../../mock/account'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { ACCESS_TOKEN, User } from '../../../../common'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { setCurrentUser } from '../../../../redux/slices/authSlide'


const MENU_OPTIONS: {
	label: string,
	icon?: string,
	path: string,
}[] = [
	{
		label: 'My Project',
		icon: 'eva:home-fill',
		path: '/games',
	},
	{
		label: 'Profile',
		icon: 'eva:person-fill',
		path: '/profile',
	},
	{
		label: 'Billing',
		icon: 'eva:settings-2-fill',
		path: '/billing',
	},
]

export default function AccountPopover() {
	const [open, setOpen] = useState(null)
	const account: User = useAppSelector(({ auth }) => auth.currentUser)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleOpen = (event: any) => {
		setOpen(event.currentTarget)
	}

	const handleClose = () => {
		setOpen(null)
	}

	const handleNavigate = (path: string) => {
		setOpen(null)
		navigate(path)
	}

	const handleLogout = () => {
		localStorage.removeItem(ACCESS_TOKEN)
		dispatch(setCurrentUser(null))
		navigate('/login')
	}

	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{
					p: 0,
					...open ? {
						'&:before': {
							zIndex: 1,
							content: "''",
							width: '100%',
							height: '100%',
							borderRadius: '50%',
							position: 'absolute',
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
						},
					} : {}
					// ...(open && ),
				}}
			>
				<Avatar src={account?.picture ?? '/assets/images/avatar.jpg'} alt="photoURL" />
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				sx={{
					p: 0,
					mt: 1.5,
					ml: 0.75,
					width: 180,
					'& .MuiMenuItem-root': {
						// typography: 'body2',
						borderRadius: 0.75,
					},
				}}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant="subtitle2" noWrap>
						{account?.name ?? account?.username}
					</Typography>
					<Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
						{account?.email}
					</Typography>
				</Box>

				<Divider sx={{ borderStyle: 'solid' }} />

				<Stack sx={{ p: 1 }}>
					{MENU_OPTIONS.map((option) => (
						<MenuItem key={option.label} onClick={() => {
							handleClose()
							navigate(option.path)
						}}>
							{option.label}
						</MenuItem>
					))}
				</Stack>

				<Divider sx={{ borderStyle: 'solid' }} />

				<MenuItem onClick={handleLogout} sx={{ m: 1 }}>
					Logout
				</MenuItem>
			</Popover>
		</>
	)
}
