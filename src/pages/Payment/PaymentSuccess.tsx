import { Box, BoxProps, Button, Link, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import FooterIllustrations from '../../components/Misc/FooterIllustrations'
import { PRIVATE_ROUTES, PageNames } from '../../routes/Routes'


const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		width: '90vw'
	}
}))

const Img = styled('img')(({ theme }) => ({
	marginBottom: theme.spacing(3),
	[theme.breakpoints.down('lg')]: {
		height: 280,
		marginTop: theme.spacing(13)
	},
	[theme.breakpoints.down('md')]: {
		height: 260
	},
	[theme.breakpoints.up('lg')]: {
		marginTop: theme.spacing(5)
	}
}))

const TreeIllustration = styled('img')(({ theme }) => ({
	left: 0,
	bottom: '5rem',
	position: 'absolute',
	[theme.breakpoints.down('lg')]: {
		bottom: 0
	}
}))

export default function PaymentSuccess() {
	const navigate = useNavigate()

	const [countdown, setCountdown] = useState(5)

	useEffect(() => {
		if (countdown === 0) {
			navigate(PRIVATE_ROUTES[PageNames.GAMES].path)
		}

		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1)
		}, 1000)

		return () => clearInterval(timer)
	}, [countdown, navigate])

	return (
		<Box className='content-center'>
			<Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
				<BoxWrapper>
					<Typography variant='h5' sx={{ mb: 1, fontSize: '2rem !important', color: 'success.main' }}>
						Your Payment is Successful!
					</Typography>
					<Typography variant='body2'>The payment has been done successfully. Thanks for being there with us.</Typography>
					<Typography variant='subtitle2'>Redirect to My Projects page after {countdown} seconds.</Typography>
				</BoxWrapper>
				<Img height='300' alt='error-illustration' src='/assets/images/pages/404.png' />
			</Box>
			<FooterIllustrations image={<TreeIllustration alt='tree' src='/assets/images/pages/tree-2.png' />} />
		</Box>
	)
}
