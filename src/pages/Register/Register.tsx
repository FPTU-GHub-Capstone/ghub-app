import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'

import firebaseSvc from '../../services/FirebaseService'
import { PUBLIC_ROUTES, PageNames } from '../../routes/Routes'

import { RegisterForm, RegisterInputType } from './RegisterForm'
import * as styles from './styles'


function handleSignUp(data: RegisterInputType, navigate: NavigateFunction) {
	return async () => {
		try {
			firebaseSvc.signUpWithEmailAndPassword(data.email, data.password)
			navigate(PUBLIC_ROUTES[PageNames.LOGIN].path)
		} catch (err) {
			console.error(err)
			navigate(PUBLIC_ROUTES[PageNames.REGISTER].path)
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
