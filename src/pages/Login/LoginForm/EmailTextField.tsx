import React from 'react'
import { TextField } from '@mui/material'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

import { LoginInputType } from './types'


// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const EmailTextField: React.FC<{ errors: FieldErrors<LoginInputType>, register: UseFormRegister<LoginInputType> }> = ({ errors, register }) => (
	<TextField
		id="email-input"
		label="Email Address"
		variant="outlined"
		margin="normal"
		type="email"
		{...register('email', {
			required: 'Email is Required',
			pattern: {
				value: emailRegex,
				message: 'Not a valid email address'
			}
		})}
		error={Boolean(errors.email)}
		helperText={errors.email?.message} />
)