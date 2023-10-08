import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'


import { Button as FacebookLoginBtn, Button as GoogleLoginBtn } from '../../components/LoginWithExternalSiteButton'
import firebaseSvc from '../../services/FirebaseService'
import restSvc from '../../services/RestService'

import FacebookLogo from '/assets/icons/FacebookLogo.svg'
import GoogleLogo from '/assets/icons/GoogleLogo.svg'

import palette from '../../theme/palette'

import { LoginForm } from './LoginForm'
import { SignInFn, SupportLoginStrategies } from './types'


const Root = styled('div')(({ theme }) => ({
	width: '100%',
	...theme.typography.body2,
	'& > :not(style) ~ :not(style)': {
		marginTop: theme.spacing(2),
	},
}))

function getSignInContext(strategy: SupportLoginStrategies): SignInFn {
	switch (strategy) {
		case 'facebook':
			return firebaseSvc.signInWithFacebook
		case 'google':
			return firebaseSvc.signInWithGoogle
		case 'password':
			return firebaseSvc.signInWithEmailAndPassword
	}
}

function handleSignIn(strategy: SupportLoginStrategies, ...args: unknown[]) {
	return async () => {
		const signInFn = getSignInContext(strategy)
		const token = await signInFn.apply(firebaseSvc, args)
		console.log(token)
		restSvc.setAuthorizationHeader(token)
		await restSvc.post(import.meta.env.VITE_IDP_URL + '/authorize')
	}
}


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
					paddingTop: '25px'
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

				<Box component='div' sx={{display: 'flex', padding: '15px', justifyContent: 'space-around'}}>
					<FacebookLoginBtn text='Login with Facebook' onClick={handleSignIn('facebook')}>
						<img src={ FacebookLogo } alt="Facebook logo" />
					</FacebookLoginBtn>
					<GoogleLoginBtn text='Login with Google' onClick={handleSignIn('google')}>
						<img src={ GoogleLogo } alt="Google logo" />
					</GoogleLoginBtn>
				</Box>
				
				<Typography component="div" sx={{display: 'flex', justifyContent: 'center', fontWeight: '400', paddingTop: '15px'}}>
					New on our platform?
					<Link style={{ textDecoration: 'none', color: palette.orange[800], paddingLeft: '5px' }} to="/register" >
						Create an account
					</Link>
				</Typography>
			</Container>
		</>
	)
}
