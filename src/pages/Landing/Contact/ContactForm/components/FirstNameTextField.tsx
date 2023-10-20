import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { ContactFormType } from '../types'

import ContactFormTextField from './ContactFormTextField'


type FirstNameTextFieldProps = {
	errors: FieldErrors<ContactFormType>,
	register: UseFormRegister<ContactFormType>,
};

const FirstNameTextField: React.FC<FirstNameTextFieldProps> = ({ errors, register }) => (
	<ContactFormTextField
		id="first_name"
		label="First Name"
		width="48%"
		autoComplete="off"
		{...register('firstName', { required: 'Your first name is required' })}
		error={Boolean(errors.firstName)}
		helperText= {errors.firstName?.message ? String(errors.firstName.message) : ''}

	/>
)

export default FirstNameTextField
