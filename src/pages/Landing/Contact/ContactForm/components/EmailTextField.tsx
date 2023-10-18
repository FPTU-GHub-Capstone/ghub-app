import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { ContactFormType } from '../types'
import { EMAIL_REGEX } from '../../../../../common/regex'

import ContactFormTextField from './ContactFormTextField'


type EmailTextFieldProps = {
	errors: FieldErrors<ContactFormType>,
	register: UseFormRegister<ContactFormType>,
};

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
