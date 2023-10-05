import React from 'react'
import { TextField } from '@mui/material'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

import { LoginInput } from './LoginInput'


export const EmailTextField: React.FC<{ errors: FieldErrors<LoginInput>, register: UseFormRegister<LoginInput> }> = ({ errors, register }) => (
	<TextField
		id="email-input"
		label="Email Address"
		variant="outlined"
		margin="normal"
		type="email"
		{...register('email', {
			required: 'Email is Required',
			pattern: {
				// eslint-disable-next-line no-useless-escape
				value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: 'Not a valid email address'
			}
		})}
		error={Boolean(errors.email)}
		helperText={errors.email?.message} />
)
