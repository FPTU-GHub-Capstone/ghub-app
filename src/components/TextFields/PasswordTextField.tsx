/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import {
	UseFormRegister,
	FieldErrors,
	Path,
	FieldValues,
} from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { PASSWORD_REGEX } from '../../common/regex'


type PasswordTextFieldProps<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
};

export const PasswordTextField = <T extends FieldValues>({
	errors,
	register,
}: PasswordTextFieldProps<T>) => {
	const [showPassword, setShowPassword] = useState(false)
	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword)
	}

	return (
		<TextField
			id="password-input"
			label="Password"
			variant="outlined"
			margin="normal"
			type={showPassword ? 'text' : 'password'}
			{...register('password' as Path<T>, {
				required: 'Password is Required',
				pattern: {
					value: PASSWORD_REGEX,
					message:
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, and a number. Length should be 6-20 characters.',
				},
			})}
			error={Boolean(errors.password)}
			helperText={
				errors.password?.message ? String(errors.password.message) : ''
			}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleTogglePasswordVisibility} edge="end">
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	)
}
