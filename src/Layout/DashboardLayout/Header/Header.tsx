import { styled } from '@mui/material/styles'
import { Box, Stack, Toolbar, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import { bgBlur } from '../../../utils/cssStyles'
import AccountPopover from '../../DashboardLayout/Header/AccountPopover'
import NotificationsPopover from '../../DashboardLayout/Header/NotificationsPopover'
import Logo from '../../../components/Logo'


const HEADER_MOBILE = 64

const HEADER_DESKTOP = 70

interface IAppBarProps extends MuiAppBarProps {
	open?: boolean;
	isOpenGameDashboard?: boolean;
}

const StyledRoot = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isOpenGameDashboard',
})<IAppBarProps>(({ theme }) => ({
	...bgBlur({ color: theme.palette.background.default }),
	boxShadow: 'none',
	borderBottom: '0.5px solid',
	borderColor: '#DFE3E8'
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	minHeight: HEADER_MOBILE,
	[theme.breakpoints.up('lg')]: {
		minHeight: HEADER_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}))


export default function Header({ isOpen }: {
	isOpen: boolean, 
}) {
	return (
		<StyledRoot open={isOpen}>
			<StyledToolbar>

				<Box sx={{display: isOpen ? 'none' : 'inline-flex' }}>
					<Logo />
					<Typography variant='h4' sx={{ color: 'text.secondary', ml: 2, display: 'block' }}>
						GHub
					</Typography>
				</Box>
				<Box sx={{ flexGrow: 1 }} />

				<Stack
					direction="row"
					alignItems="center"
					spacing={{
						xs: 0.5,
						sm: 1,
					}}
				>
					<NotificationsPopover />
					<AccountPopover />
				</Stack>
			</StyledToolbar>
		</StyledRoot>
	)
}
