import React from 'react'
import { TextField } from '@mui/material'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

import { LoginInput } from './LoginInput'


export const PasswordTextField: React.FC<{ errors: FieldErrors<LoginInput>, register: UseFormRegister<LoginInput> }> = ({ errors, register }) => (
	<TextField
		id="password-input"
		label="Password"
		variant="outlined"
		margin="normal"
		type="password"
		{...register('password', {
			required: 'Password is Required',
			pattern: {
				value: /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,20}$/,
				message: 'Password must start with a letter, contain at least 1 uppercase letter, 1 lowercase letter, and a number. Length should be 6-20 characters.'
				//FIXME: Fixing this regex bug. It can start with a number, can contain special characters.
			}
		})}
		error={Boolean(errors.password)}
		helperText={errors.password?.message} />
)
