import React from 'react'
import {
	FormGroup,
	FormControlLabel,
	Checkbox
} from '@mui/material'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'

import { LoginInput } from './LoginInput'


export const RememberMeCheckbox: React.FC<{ watch: UseFormWatch<LoginInput>, register: UseFormRegister<LoginInput> }> = ({ watch, register }) => (
	<FormGroup>
		<FormControlLabel
			control={<Checkbox
				checked={watch('remembered')}
				{...register('remembered')} />}
			label="Remember Me" />
	</FormGroup>
)
