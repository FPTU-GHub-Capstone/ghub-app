import { TextField } from '@mui/material'
import { UseFormRegister, FieldErrors, Path, FieldValues } from 'react-hook-form'

import { EMAIL_REGEX } from '../../common/regex'


type EmailTextFieldProps<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
};

export const EmailTextField = <T extends FieldValues>({ errors, register }: EmailTextFieldProps<T>) => (
	<TextField
		id="email-input"
		label="Email Address"
		variant="outlined"
		margin="normal"
		type="email"
		{...register('email' as Path<T>, {
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
