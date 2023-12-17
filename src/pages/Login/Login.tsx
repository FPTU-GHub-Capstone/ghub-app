import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'

import config from '../../config'
import {
	Button as GoogleLoginBtn,
} from '../../components/LoginWithExternalSiteButton'
import firebaseSvc from '../../services/FirebaseService'
import { RestService } from '../../services/RestService'

import GoogleLogo from '/assets/icons/GoogleLogo.svg'

import { APPLICATION_ROUTES, PageNames } from '../../routes'
import { ACCESS_TOKEN, RequestHeaders } from '../../common'
import { getProfile } from '../../services/AuthService'

import { LoginForm } from './LoginForm'
import * as styles from './styles'


type LoginResponse = {
	access_token: string,
	token_type: string,
	expires_in?: number,
	scope?: string,
};

type SupportLoginStrategies = 'facebook' | 'google' | 'password';
type SignInFn = Fn<any, Promise<string>>;

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

async function callAuthorizeApi(signInFn: SignInFn, args: unknown[]) {
	const restSvc = RestService.getInstance()
	restSvc.ejectAuthInterceptor()
	const token = await signInFn.apply(firebaseSvc, args)
	const result = await restSvc.post<LoginResponse>(
		config.IDP_URL + '/authorize',
		undefined,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`,
			},
		},
	)
	localStorage.setItem(ACCESS_TOKEN, result.data.access_token)
	await getProfile()
}

function handleSignIn(
	strategy: SupportLoginStrategies,
	navigate: NavigateFunction,
	...args: unknown[]
) {
	return async () => {
		const signInFn = getSignInContext(strategy)
		try {
			await callAuthorizeApi(signInFn, args)
			navigate(APPLICATION_ROUTES[PageNames.GAMES].path)
		} catch (err) {
			console.error(err)
			navigate(APPLICATION_ROUTES[PageNames.LOGIN].path)
			// show error, username or password not found
		}
	}
}

const DividerOr = (
	<Root>
		<Divider role="presentation">OR</Divider>
	</Root>
)

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

				<LoginForm
					onSubmit={(data) => {
						const { email, password } = data
						return handleSignIn('password', navigate, email, password)()
					}}
				/>

				{DividerOr}

				<Box component="div" sx={styles.externalLoginBox}>
					<GoogleLoginBtn
						text="Login with Google"
						onClick={handleSignIn('google', navigate)}
					>
						<img src={GoogleLogo} alt="Google logo" />
					</GoogleLoginBtn>
				</Box>

				<Typography component="div" sx={styles.newAccText}>
					New on our platform?
					<Link style={styles.createAccLink} to="/register">
						Create an account
					</Link>
				</Typography>
			</Container>
		</>
	)
}
