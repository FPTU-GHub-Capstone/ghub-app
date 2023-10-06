import React from 'react'
import {
	FormGroup,
	FormControlLabel,
	Checkbox
} from '@mui/material'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'

import { LoginInputType } from '.'


export const RememberMeCheckbox: React.FC<{ watch: UseFormWatch<LoginInputType>, register: UseFormRegister<LoginInputType> }> = ({ watch, register }) => (
	<FormGroup>
		<FormControlLabel
			control={<Checkbox
				checked={watch('remembered')}
				{...register('remembered')} />}
			label="Remember Me" />
	</FormGroup>
)
