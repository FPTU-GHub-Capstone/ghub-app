import { styled } from '@mui/material/styles'
import { Badge, BadgeProps, Box, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { useNavigate } from 'react-router'

import { bgBlur } from '../../../utils/cssStyles'
import AccountPopover from '../../DashboardLayout/Header/AccountPopover'
import Logo from '../../../components/Logo'
import { PRIVATE_ROUTES, PageNames } from '../../../routes/Routes'
import Iconify from '../../../components/Iconify'


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

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
	'& .MuiBadge-badge': {
		right: 2,
		top: 7,
		// border: `2px solid ${theme.palette.background.paper}`,
		// padding: '0 4px',
	},
}))


export default function Header({ isOpen }: {
	isOpen: boolean,
}) {
	const navigate = useNavigate()

	return (
		<StyledRoot open={isOpen}>
			<StyledToolbar>

				<Box sx={{ display: isOpen ? 'none' : 'inline-flex' }} 
					onClick={() => navigate(PRIVATE_ROUTES[PageNames.GAMES].path)}
				>
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
						xs: 1,
						sm: 2,
					}}
				>
					{/* <NotificationsPopover /> */}
					<IconButton
						sx={{ width: 42, height: 42 }}
						onClick={() => navigate(PRIVATE_ROUTES[PageNames.SALES].path)}
					>
						<Tooltip title="Sales">
							<StyledBadge color="error">
								<Iconify
									icon="akar-icons:statistic-up"
									sx={{ width: 35, height: 35 }}
								/>
								{/* <ReceiptIcon sx={{ width: 30, height: 35 }} /> */}
							</StyledBadge>
						</Tooltip>
					</IconButton>
					<AccountPopover />
				</Stack>
			</StyledToolbar>
		</StyledRoot>
	)
}
