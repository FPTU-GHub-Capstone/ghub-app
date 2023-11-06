import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { ContactFormType } from '../types'

import ContactFormTextField from './ContactFormTextField'


type LastNameTextFieldProps = {
	errors: FieldErrors<ContactFormType>,
	register: UseFormRegister<ContactFormType>,
};

const LastNameTextField: React.FC<LastNameTextFieldProps> = ({ errors, register }) => (
	<ContactFormTextField
		id="last_name"
		label="Last Name"
		width="48%"
		autoComplete="off"
		{...register('lastName', { required: 'Your last name is required' })}
		error={Boolean(errors.lastName)}
		helperText={errors.lastName?.message ? String(errors.lastName.message) : ''}
	/>
)

export default LastNameTextField
