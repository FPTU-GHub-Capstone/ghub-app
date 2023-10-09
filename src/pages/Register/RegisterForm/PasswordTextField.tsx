import { TextField } from '@mui/material'
import { UseFormRegister, FieldErrors, Path, FieldValues } from 'react-hook-form'


type PasswordTextFieldProps<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
};


const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z][A-Za-z0-9]{5,19}$/

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
