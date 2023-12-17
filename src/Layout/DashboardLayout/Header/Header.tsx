import { styled } from '@mui/material/styles'
import { Badge, BadgeProps, Box, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

import { bgBlur } from '../../../utils/cssStyles'
import AccountPopover from '../../DashboardLayout/Header/AccountPopover'
import Logo from '../../../components/Logo'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { billsFetch } from '../../../redux/slices/billSlide'
import { BillStatus } from '../../../common'


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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: 0,
		top: 7,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}))


export default function Header({ isOpen }: {
	isOpen: boolean,
}) {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const bills = useAppSelector(({ bill }) => bill.billList)
	const needToPay = bills.filter((bill) => (bill.status === BillStatus.PENDING || bill.status === BillStatus.OVERDUE))

	useEffect(() => {
		dispatch(billsFetch())
	}, [dispatch])

	return (
		<StyledRoot open={isOpen}>
			<StyledToolbar>

				<Box sx={{ display: isOpen ? 'none' : 'inline-flex' }}>
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
						sm: 1.5,
					}}
				>
					{/* <NotificationsPopover /> */}

					<IconButton sx={{ width: 42, height: 42 }} onClick={() => navigate('/billing')}>
						<StyledBadge badgeContent={needToPay.length} color="error" >
							<Tooltip title='Billing'>
								<ReceiptIcon sx={{ width: 30, height: 35 }} />
							</Tooltip>
						</StyledBadge>
					</IconButton>


					<AccountPopover />
				</Stack>
			</StyledToolbar>
		</StyledRoot>
	)
}
