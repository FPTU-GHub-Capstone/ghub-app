import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'


import { Button as FacebookLoginBtn, Button as GoogleLoginBtn } from '../../components/LoginWithExternalSiteButton'
import firebaseSvc from '../../services/FirebaseService'
import restSvc from '../../services/RestService'

import FacebookLogo from '/assets/icons/FacebookLogo.svg'
import GoogleLogo from '/assets/icons/GoogleLogo.svg'

import { PageName, convertNameToPath } from '../../common'

import { LoginForm } from './LoginForm'
import { SignInFn, SupportLoginStrategies } from './types'
import * as styles from './styles'


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

function handleSignIn(strategy: SupportLoginStrategies, navigate: NavigateFunction, ...args: unknown[]) {
	return async () => {
		const signInFn = getSignInContext(strategy)
		try {
			const token = await signInFn.apply(firebaseSvc, args)
			restSvc.setAuthorizationHeader(token)
			await restSvc.post(import.meta.env.VITE_IDP_URL + '/authorize')
			navigate(convertNameToPath(PageName.DASHBOARD))
		} catch {
			navigate(convertNameToPath(PageName.LOGIN))
		}
	}
}


const DividerOr = <Root>
	<Divider role="presentation">OR</Divider>
</Root>

export const Login: React.FC = () => {
	const navigate = useNavigate()

	return (
		<>
			<Container maxWidth="sm" component="section">
				<Box sx={styles.headingBox}>
					<Typography sx={styles.headingLogin} component="h1">
						Welcome to GHub!
					</Typography>
					<Box>
						<Typography my={2} sx={styles.descriptionLogin} component="p">
							Please sign-in to your account and start the adventure
						</Typography>
					</Box>
				</Box>

				<LoginForm />

				{DividerOr}

				<Box component='div' sx={styles.externalLoginBox}>
					<FacebookLoginBtn text='Login with Facebook' onClick={handleSignIn('facebook', navigate)}>
						<img src={ FacebookLogo } alt="Facebook logo" />
					</FacebookLoginBtn>
					<GoogleLoginBtn text='Login with Google' onClick={handleSignIn('google', navigate)}>
						<img src={ GoogleLogo } alt="Google logo" />
					</GoogleLoginBtn>
				</Box>
				
				<Typography component="div" sx={styles.newAccText}>
					New on our platform?
					<Link style={styles.createAccLink} to="/register" >
						Create an account
					</Link>
				</Typography>
			</Container>
		</>
	)
}
