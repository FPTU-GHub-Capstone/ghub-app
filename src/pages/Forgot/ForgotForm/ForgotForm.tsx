import React from 'react'
import {
	Box,
	ThemeProvider,
	Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import {Button as ForgotSubmitBtn} from '../../../components/PublicFormButton'
import { EmailTextField } from '../../../components/TextFields/EmailTextField'
import palette from '../../../theme/palette'

import { theme } from './styles'

import { ForgotInputType } from '.'


const RegisterForm: React.FC = () => {
	const form = useForm<ForgotInputType>({
		mode: 'onChange',
		defaultValues: {
			email: '',
		}
	})
	const { register, handleSubmit, formState } = form
	const { errors } = formState
	
	const onSubmit = (data: ForgotInputType) => {
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
				<EmailTextField<ForgotInputType> errors={errors} register={register} />
				
				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<Typography sx={{ 
						fontSize: '16px', 
						wordWrap: 'break-word'
					}}>
						<Link to='/login' style={{ textDecoration: 'none', color: palette.orange[800] }}>
							Go back to Login
						</Link>
					</Typography>

					<ForgotSubmitBtn text='Request reset link'/>
				</Box>

			</Box>
		</ThemeProvider>
	)
}

export default RegisterForm
