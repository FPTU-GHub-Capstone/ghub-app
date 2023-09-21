import React from 'react'
import { Box, TextField, Container, Typography } from '@mui/material'


export const Login: React.FC = () => {
	return (
		<>
			<Container maxWidth="sm">
				<Typography my={5} component="h1">
					Welcome to GHub!
				</Typography>
				<Typography my={2}  component="p">
					Please sign-in to your account and start the adventure
				</Typography>

				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					'& .MuiTextField-root': { width: '25ch' },
				}}>
					<TextField id="email-input" label="Email Address" variant="outlined"/>
					<TextField id="password-input" label="Password" variant="outlined" />
				</Box>
			</Container>
		</>
	)
}