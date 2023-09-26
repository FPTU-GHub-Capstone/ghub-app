import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'


const Root = styled('div')(({ theme }) => ({
	width: '100%',
	...theme.typography.body2,
	'& > :not(style) ~ :not(style)': {
		marginTop: theme.spacing(2),
	},
}))


const DividerOr = <Root>
	<Divider role="presentation">OR</Divider>
</Root>


export const Login: React.FC = () => {
	return (
		<>
			<Container maxWidth="sm" component="section">
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					alignItems: 'center',
				}}>
					<Typography sx={{fontWeight: '450', fontSize: '2vw'}} component="h1">
						Welcome to GHub!
					</Typography>
					<Box>
						<Typography my={2} sx={{fontSize: '1vw'}} component="p">
							Please sign-in to your account and start the adventure
						</Typography>					
					</Box>
			
				</Box>

				<LoginForm />

				{DividerOr}

				<Typography component="div" sx={{display: 'flex', justifyContent: 'center', fontWeight: '400'}}>
						New on our platform?<Link style={{paddingLeft: '5px'}} to="/register">Create an account</Link>
				</Typography>
			</Container>
		</>
	)
}