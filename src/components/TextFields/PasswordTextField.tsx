import { TextField } from '@mui/material'
import { UseFormRegister, FieldErrors, Path, FieldValues } from 'react-hook-form'

import { PASSWORD_REGEX } from '../../common/regex'


type PasswordTextFieldProps<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
};

export const PasswordTextField = <T extends FieldValues>({ errors, register }: PasswordTextFieldProps<T>) => (
	<TextField
		id="password-input"
		label="Password"
		variant="outlined"
		margin="normal"
		type="password"
		{...register('password' as Path<T>, {
			required: 'Password is Required',
			pattern: {
				value: PASSWORD_REGEX,
				message: 'Password must start with a letter, contain at least 1 uppercase letter, 1 lowercase letter, and a number. Length should be 6-20 characters.',
			},
		})}
		error={Boolean(errors.password)}
		helperText={errors.password?.message ? String(errors.password.message) : ''}
	/>
)
