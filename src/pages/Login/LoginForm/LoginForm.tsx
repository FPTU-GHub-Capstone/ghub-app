import React from 'react'
import {
	Box,
	Typography,
	ThemeProvider,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import {Button as LoginButton} from '../../../components/PublicFormButton'
import palette from '../../../theme/palette'

import { theme } from './styles'
import { EmailTextField } from './EmailTextField'
import { PasswordTextField } from './PasswordTextField'
import { RememberMeCheckbox } from './RememberMeCheckbox'
import { LoginInput } from './LoginInput'
//HACK Where should I put LoginInput Type to ?

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

	return (
		<ThemeProvider theme={theme}>
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
						fontSize: '16px', 
						wordWrap: 'break-word'
					}}>
						<Link to='/forgot' style={{ textDecoration: 'none', color: palette.orange[800] }}>
							Forgot your password?
						</Link>
					</Typography>
				</Box>
				<LoginButton text='Login'/>
			</Box>
			<DevTool control={control} />
		</ThemeProvider>
	)
}

export default LoginForm
