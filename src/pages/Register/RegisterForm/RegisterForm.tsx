import React from 'react'
import {
	Box,
	ThemeProvider,
} from '@mui/material'
import { useForm } from 'react-hook-form'

import {Button as RegisterButton} from '../../../components/PublicFormButton'
import { EmailTextField } from '../../../components/TextFields/EmailTextField'
import { PasswordTextField } from '../../../components/TextFields/PasswordTextField'

import { theme } from './styles'
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
	const { watch, register, handleSubmit, formState } = form
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
		</ThemeProvider>
	)
}

export default RegisterForm
