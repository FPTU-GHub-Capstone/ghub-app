import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'

import { Button as GoogleSignupBtn } from '../../components/LoginWithExternalSiteButton'

import GoogleLogo from '/assets/icons/GoogleLogo.svg'

import firebaseSvc from '../../services/FirebaseService'
import { APPLICATION_ROUTES, PageNames } from '../../routes'

import { RegisterForm, RegisterInputType } from './RegisterForm'
import * as styles from './styles'


const Root = styled('div')(({ theme }) => ({
	width: '100%',
	...theme.typography.body2,
	'& > :not(style) ~ :not(style)': {
		marginTop: theme.spacing(2),
	},
}))

const DividerOr = (
	<Root>
		<Divider role="presentation">OR</Divider>
	</Root>
)

function handleSignUp(data: RegisterInputType, navigate: NavigateFunction) {
	return async () => {
		try {
			firebaseSvc.signUpWithEmailAndPassword(data.email, data.password)
			navigate(APPLICATION_ROUTES[PageNames.LOGIN].path)
		} catch (err) {
			console.error(err)
			navigate(APPLICATION_ROUTES[PageNames.REGISTER].path)
			// show error
		}
	}
}

export const Register: React.FC = () => {
	const navigate = useNavigate()

	return (
		<>
			<Container maxWidth="sm" component="section">
				<Box sx={styles.headingBox}>
					<Typography sx={styles.headingRegister} component="h1">
            Adventure starts here
					</Typography>
					<Box>
						<Typography my={2} sx={styles.descriptionRegister} component="p">
              Make your app management easy and fun!
						</Typography>
					</Box>
				</Box>

				<RegisterForm
					onSubmit={(data) => handleSignUp(data, navigate)()}
				/>

				{DividerOr}

				<Box component='div' sx={styles.externalSignUpBox}>
					<GoogleSignupBtn text='Signup with Google'>
						<img src={ GoogleLogo } alt="Google logo" />
					</GoogleSignupBtn>
				</Box>

				<Typography component="div" sx={styles.haveAccText}>
          Already have an account ?
					<Link style={styles.loginLink} to="/login">
            Login instead
					</Link>
				</Typography>
			</Container>
		</>
	)
}
