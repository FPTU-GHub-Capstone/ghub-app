import { styled } from '@mui/material/styles'
import { Box, Stack, Toolbar } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import { bgBlur } from '../../../utils/cssStyles'

import NotificationsPopover from './NotificationsPopover'
import AccountPopover from './AccountPopover'
import Searchbar from './SearchBar/SearchBar'


const NAV_WIDTH = 230

const HEADER_MOBILE = 64

const HEADER_DESKTOP = 92

interface IAppBarProps extends MuiAppBarProps {
	open?: boolean;
	isOpenGameDashboard?: boolean;
}

const StyledRoot = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isOpenGameDashboard',
})<IAppBarProps>(({ theme, open, isOpenGameDashboard }) => ({
	...bgBlur({ color: theme.palette.background.default }),
	boxShadow: 'none',
	...(isOpenGameDashboard && {
		marginLeft: NAV_WIDTH,
		width: `calc(100% - ${NAV_WIDTH + 50 }px)`
	}),
	...(!open && !isOpenGameDashboard && {
		width: `calc(100% - ${50}px)`
	}),
	...(open && {
		marginLeft: isOpenGameDashboard ? NAV_WIDTH * 2 : NAV_WIDTH,
		width: `calc(100% - ${isOpenGameDashboard ? NAV_WIDTH * 2 + 1 : NAV_WIDTH + 1}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
	// [theme.breakpoints.up('lg')]: {
	// 	width: `calc(100% - ${NAV_WIDTH + 1}px)`,
	// },
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	minHeight: HEADER_MOBILE,
	[theme.breakpoints.up('lg')]: {
		minHeight: HEADER_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}))


export default function Header({ isOpen, isOpenGameDashboard }: {
	isOpen: boolean, 
	isOpenGameDashboard?: boolean,
}) {
	return (
		<StyledRoot open={isOpen} isOpenGameDashboard={isOpenGameDashboard}>
			<StyledToolbar>

				<Searchbar />
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
