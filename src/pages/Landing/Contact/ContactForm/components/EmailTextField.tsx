import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { ContactFormType } from '../types'

import ContactFormTextField from './ContactFormTextField'


type EmailTextFieldProps = {
	errors: FieldErrors<ContactFormType>,
	register: UseFormRegister<ContactFormType>,
};

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const EmailTextField: React.FC<EmailTextFieldProps> = ({ errors, register }) => (
	<ContactFormTextField
		id="email"
		label="Email Address"
		width="100%"
		autoComplete="off"
		{...register('email', {
			required: 'Email is Required',
			pattern: {
				value: EMAIL_REGEX,
				message: 'Not a valid email address',
			},
		})}
		error={Boolean(errors.email)}
		helperText={errors.email?.message ? String(errors.email.message) : ''}

	/>
)

export default EmailTextField
