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
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import LoginButton from './LoginButton/LoginButton'


type LoginInput = {
	email: string,
	password: string,
	remembered: boolean,
}

const EmailTextField: React.FC<{ errors: any, register: any }> = ({ errors, register }) => (
	<TextField
		id="email-input"
		label="Email Address"
		variant="outlined"
		margin="normal"
		type="email"
		{...register('email', {
			required: 'Email is Required',
			pattern: {
				// eslint-disable-next-line no-useless-escape
				value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: 'Not a valid email address'
			}
		})}
		error={!!errors.email}
		helperText={errors.email?.message}
	/>
)

const PasswordTextField: React.FC<{ errors: any, register: any }> = ({ errors, register }) => (
	<TextField
		id="password-input"
		label="Password"
		variant="outlined"
		margin="normal"
		type="password"
		{...register('password', {
			required: 'Password is Required',
			pattern: {
				value: /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,20}$/,
				message: 'Password must start with a letter, contain at least 1 uppercase letter, 1 lowercase letter, and a number. Length should be 6-20 characters.'
			}
		})}
		error={!!errors.password}
		helperText={errors.password?.message}
	/>
)

const RememberMeCheckbox: React.FC<{ watch: any, register: any }> = ({ watch, register }) => (
	<FormGroup>
		<FormControlLabel
			control={
				<Checkbox
					checked={watch('remembered')}
					{...register('remembered')}
				/>
			}
			label="Remember Me"
		/>
	</FormGroup>
)

const LoginForm: React.FC = () => {
	const form = useForm<LoginInput>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			remembered: false,
		}
	})
	const { watch, register, handleSubmit, formState, control } = form
	const { errors } = formState
	
	const onSubmit = (data: LoginInput) => {
		console.log({...data})
	}

	return (<>
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
		}}
		component='form'
		onSubmit={handleSubmit(onSubmit)}
		>
			<EmailTextField errors={errors} register={register} />
			<PasswordTextField errors={errors} register={register} />

			<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<RememberMeCheckbox watch={watch} register={register} />

				<Typography sx={{ 
					color: '#DC7000', fontSize: '16px', 
					fontWeight: 400, textDecoration: 'underline', wordWrap: 'break-word'
				}}>
					Forgot your password?
				</Typography>
			</Box>

			<LoginButton/>
		</Box>
		<DevTool control={control} />
	</>)
}

export default LoginForm
