import React from 'react'
import {
	Box,
	Typography,
	ThemeProvider,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {Button as LoginButton} from '../../../components/PublicFormButton'
import { EmailTextField } from '../../../components/TextFields/EmailTextField'
import { PasswordTextField } from '../../../components/TextFields/PasswordTextField'
import palette from '../../../theme/palette'

import { theme } from './styles'
import { RememberMeCheckbox } from './RememberMeCheckbox'

import { LoginInputType } from '.'


type LoginFormProps = {
	onSubmit: (data: LoginInputType) => any,
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
	const form = useForm<LoginInputType>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			remembered: false,
		}
	})
	const { watch, register, handleSubmit, formState } = form
	const { errors } = formState

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			>
				<EmailTextField<LoginInputType> errors={errors} register={register} />
				<PasswordTextField<LoginInputType> errors={errors} register={register} />

				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<RememberMeCheckbox watch={watch} register={register} />

					<Typography sx={{ 
						fontSize: '16px', 
						wordWrap: 'break-word'
					}}>
						<Link to='/forgot-password' style={{ textDecoration: 'none', color: palette.orange[800] }}>
							Forgot your password?
						</Link>
					</Typography>
				</Box>
				<LoginButton text='Login'/>
			</Box>
		</ThemeProvider>
	)
}

export default LoginForm
