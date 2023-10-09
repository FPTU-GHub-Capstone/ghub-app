import React from 'react'
import {
	Box,
	ThemeProvider,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import {Button as RegisterButton} from '../../../components/PublicFormButton'

import { theme } from './styles'
import { EmailTextField } from './EmailTextField'
import { PasswordTextField } from './PasswordTextField'
import { AgreeTermsCheckbox } from './AgreeTermsCheckbox'

import { RegisterInputType } from '.'


const RegisterForm: React.FC = () => {
	const form = useForm<RegisterInputType>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			agreedTerms: false,
		}
	})
	const { watch, register, handleSubmit, formState, control } = form
	const { errors } = formState
	
	const onSubmit = (data: RegisterInputType) => {
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
				<EmailTextField<RegisterInputType> errors={errors} register={register} />
				<PasswordTextField<RegisterInputType> errors={errors} register={register} />

				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<AgreeTermsCheckbox watch={watch} register={register} />
				</Box>
				<RegisterButton text='Sign up'/>
			</Box>
			<DevTool control={control} />
		</ThemeProvider>
	)
}

export default RegisterForm
