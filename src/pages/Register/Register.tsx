import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'


import { Button as FacebookSignupBtn, Button as GoogleSignupBtn } from '../../components/LoginWithExternalSiteButton'

import FacebookLogo from '/assets/icons/FacebookLogo.svg'
import GoogleLogo from '/assets/icons/GoogleLogo.svg'

import palette from '../../theme/palette'

import { RegisterForm } from './RegisterForm'


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


export const Register: React.FC = () => {
	return (
		<>
			<Container maxWidth="sm" component="section">
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					alignItems: 'center',
					paddingTop: '25px'
				}}>
					<Typography sx={{fontWeight: '450', fontSize: '2vw'}} component="h1">
						Adventure starts here
					</Typography>
					<Box>
						<Typography my={2} sx={{fontSize: '1vw'}} component="p">
							Make your app management easy and fun!
						</Typography>
					</Box>
			
				</Box>

				<RegisterForm />

				{DividerOr}

				<Box component='div' sx={{display: 'flex', padding: '15px', justifyContent: 'space-around'}}>
					<FacebookSignupBtn text='Signup with Facebook'>
						<img src={ FacebookLogo } alt="Facebook logo" />
					</FacebookSignupBtn>
					<GoogleSignupBtn text='Signup with Google'>
						<img src={ GoogleLogo } alt="Google logo" />
					</GoogleSignupBtn>
				</Box>
				
				<Typography component="div" sx={{display: 'flex', justifyContent: 'center', fontWeight: '400', paddingTop: '15px'}}>
					Already have an account ?
					<Link style={{ textDecoration: 'none', color: palette.orange[800], paddingLeft: '5px' }} to="/login" >
						Login instead
					</Link>
				</Typography>
			</Container>
		</>
	)
}
