import { Box, BoxProps, Button, Link, Typography, styled } from '@mui/material'
import React from 'react'

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

export default function PaymentFailed() {
	return (
		<Box className='content-center'>
			<Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
				<BoxWrapper>
					<Typography variant='h5' sx={{ mb: 1, fontSize: '2rem !important', color: 'error.main' }}>
						Payment Failed 👨🏻‍💻
					</Typography>
					<Typography variant='body2'>Your transaction has failed due to some technical error. Please try again!</Typography>
				</BoxWrapper>
				<Img height='300' alt='error-illustration' src='/assets/images/pages/500.png' />
				<Link href={PRIVATE_ROUTES[PageNames.BILLS].path}>
					<Button component='a' variant='contained' sx={{ px: 5.5, backgroundColor: 'primary.dark' }}>
						Back to Billing Page
					</Button>
				</Link>
			</Box>
			<FooterIllustrations image={<TreeIllustration alt='tree' src='/assets/images/pages/tree-3.png' />} />
		</Box>
	)
}
