import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, ThemeProvider } from '@mui/material'

import { Button as ContactFormBtn } from '../../../../components/PublicFormButton'


import { theme } from './styles'
import FirstNameTextField from './components/FirstNameTextField'
import LastNameTextField from './components/LastNameTextField'
import EmailTextField from './components/EmailTextField'
import MessageTextField from './components/MessageTextField'
import { ContactFormType } from './types'


const ContactForm: React.FC = () => {
	const form = useForm<ContactFormType>({
		mode: 'onChange',
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			message: '',
		},
	})
	const { register, handleSubmit, formState } = form
	const { errors } = formState

	const onSubmit = (data: ContactFormType) => {
		console.log({ ...data })
	}

	return (
		<ThemeProvider theme={theme}>
			<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', paddingBottom: 10 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'white'}}>
						<FirstNameTextField errors={errors} register={register} />
						<LastNameTextField errors={errors} register={register} />
					</Box>
					<EmailTextField errors={errors} register={register} />
					<MessageTextField errors={errors} register={register} />
					<ContactFormBtn text="Get in touch" />
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default ContactForm
