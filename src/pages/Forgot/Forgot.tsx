import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'

import * as styles from './styles'
import { ForgotForm } from './ForgotForm'


const getNavbarHeight = () => {
	const navbar = document.querySelector('nav')
	return navbar ? navbar.clientHeight : 0
}

export const Forgot: React.FC = () => {
	useEffect(() => {
		function handleResize() {
			const navbarHeight = getNavbarHeight()
			const forgotContainer: HTMLElement | null = document.querySelector('#forgot-container')

			if (forgotContainer) {
				const minHeight = `calc(100vh - ${navbarHeight}px)`
				const backgroundPosition = `0px -${navbarHeight}px`
				
				forgotContainer.style.minHeight = minHeight
				forgotContainer.style.backgroundPosition = backgroundPosition
			}
		}

		window.addEventListener('resize', handleResize)
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div id="forgot-container" style={styles.containerStyle}>
			<Container maxWidth="sm" component="section">
				<Box sx={styles.formContainer}>
					<Typography sx={styles.heading} component="h1">
						Forgot your Password?
					</Typography>
					<Box>
						<Typography my={2} sx={styles.description} component="p">
							Enter your email and we`ll send you instructions to reset your password
						</Typography>
					</Box>
				</Box>

				<ForgotForm />
			</Container>
		</div>
	)
}
