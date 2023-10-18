import React from 'react'
import { Box, Container, Typography } from '@mui/material'


import { ForgotForm } from './ForgotForm'


export const Forgot: React.FC = () => {
	return (
		<div style={{
			backgroundImage: 'url(\'/assets/images/banner/bg_forgot.png\')',
			backgroundSize: '100% 100vh', backgroundRepeat: 'no-repeat', minHeight: '100vh',
		}}
		>
			<Container maxWidth="sm" component="section">
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					alignItems: 'center',
					paddingTop: '25px'
				}}>
					<Typography sx={{fontWeight: '450', fontSize: '2vw'}} component="h1">
						Forgot your Password ?	
					</Typography>
					<Box>
						<Typography my={2} sx={{fontSize: '1vw'}} component="p">
							Enter your email and we`ll send you instructions to reset your password
						</Typography>
					</Box>
			
				</Box>

				<ForgotForm />
			</Container>
		</div>
	)
}
