import React from 'react'
import {
	FormGroup,
	FormControlLabel,
	Checkbox
} from '@mui/material'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'

import palette from '../../../theme/palette'

import { RegisterInputType } from '.'


const linkStyle = { textDecoration: 'none', color: palette.orange[800], paddingLeft: '5px' }

export const AgreeTermsCheckbox: React.FC<{ watch: UseFormWatch<RegisterInputType>, register: UseFormRegister<RegisterInputType> }> = ({ watch, register }) => (
	<FormGroup>
		<FormControlLabel
			control={<Checkbox
				checked={watch('agreedTerms')}
				{...register('agreedTerms')} />}
			label={<>
				Agree to our{' '} 
				<Link style={linkStyle} to='/'>Term Of Use</Link> and{' '}
				<Link style={linkStyle} to='/'>Privacy Policy</Link>
			</>} />
	</FormGroup>
)
