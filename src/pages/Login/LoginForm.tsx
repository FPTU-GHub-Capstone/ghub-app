import React, { useState } from 'react'
import {
	Box,
	TextField,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

import LoginButton from './LoginButton/LoginButton'


const LoginForm: React.FC = () => {
	const [isChecked, setChecked] = useState<boolean>(true)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(event.target.value)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}

	const handleLoginClick = () => {
		const loginData = `Email: ${email}, Password: ${password}`
		console.log(loginData)
	}

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
		}}
		component='form'
		onSubmit={handleLoginClick}
		>
			<TextField
				id="email-input" label="Email Address" variant="outlined" margin="normal"
				value={email} onChange={handleEmailChange}
			/>
			<TextField
				id="password-input" label="Password" variant="outlined" margin="normal"
				type="password" value={password} onChange={handlePasswordChange}
			/>
			<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={isChecked}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label="Remember Me"
					/>
				</FormGroup>

				<Typography sx={{ 
					color: '#DC7000', fontSize: '16px', 
					fontWeight: 400, textDecoration: 'underline', wordWrap: 'break-word'
				}}>
					Forgot your password?
				</Typography>
			</Box>

			<LoginButton/>
		</Box>
	)
}

export default LoginForm
