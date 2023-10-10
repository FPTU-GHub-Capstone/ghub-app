import { TextField } from '@mui/material'
import { UseFormRegister, FieldErrors, Path, FieldValues } from 'react-hook-form'


type EmailTextFieldProps<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
};

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
