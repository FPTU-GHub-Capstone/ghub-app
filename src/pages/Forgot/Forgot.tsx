import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'

import { ForgotForm } from './ForgotForm'


const getNavbarHeight = () => {
	const navbar = document.querySelector('nav')
	return navbar ? navbar.clientHeight : 0
}

export const Forgot: React.FC = () => {
	const [navbarHeight, setNavbarHeight] = useState(getNavbarHeight)

	useEffect(() => {
		function handleResize() {
			setNavbarHeight(getNavbarHeight())
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div 
			style={{
				backgroundImage: 'url(\'/assets/images/banner/bg_forgot.png\')',
				backgroundSize: '100% 100vh',
				backgroundRepeat: 'no-repeat',
				minHeight: `calc(100vh - ${navbarHeight}px - 1px)`,
				backgroundPosition: `0px -${navbarHeight - 1}px`,
			}}
		>
			<Container maxWidth="sm" component="section">
				<Box 
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexWrap: 'wrap',
						alignItems: 'center',
						paddingTop: '25px',
					}}
				>
					<Typography sx={{ fontWeight: '450', fontSize: '2vw' }} component="h1">
						Forgot your Password?
					</Typography>
					<Box>
						<Typography my={2} sx={{ fontSize: '1vw' }} component="p">
							Enter your email and we`ll send you instructions to reset your password
						</Typography>
					</Box>
				</Box>

				<ForgotForm />
			</Container>
		</div>
	)
}
