import React from 'react'
import {
	FormGroup,
	FormControlLabel,
	Checkbox
} from '@mui/material'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'

import palette from '../../../theme/palette'
import ViewOnlyDialog from '../../../components/ViewOnlyDialog'

import { privacyPolicyContent, termOfUseContent } from './data'

import { RegisterInputType } from '.'


const linkStyle = { textDecoration: 'none', color: palette.orange[800], paddingLeft: '5px' }

export const AgreeTermsCheckbox: React.FC<{ watch: UseFormWatch<RegisterInputType>, register: UseFormRegister<RegisterInputType> }> = ({ watch, register }) => {
	const [isTermOfUseOpen, setTermOfUseDialog] = React.useState<boolean>(false)
	const [isPrivacyPolOpen, setPrivacyPolicyDialog] = React.useState<boolean>(false)

	const openTermOfUse = () => setTermOfUseDialog(true)
	const closeTermOfUse= () => setTermOfUseDialog(false)

	const openPrivacyPolicy = () => setPrivacyPolicyDialog(true)
	const closePrivacyPolicy = () => setPrivacyPolicyDialog(false)

	return (
		<FormGroup>
			<FormControlLabel
				control={<Checkbox
					checked={watch('agreedTerms')}
					{...register('agreedTerms')} />}
				label={<>
				Agree to our{' '} 
					<Link style={linkStyle} onClick={openTermOfUse} to="">Term Of Use</Link> and{' '}
					<Link style={linkStyle} onClick={openPrivacyPolicy} to="">Privacy Policy</Link>
				</>}
				required 
			/>
			<ViewOnlyDialog open={isTermOfUseOpen} onClose={closeTermOfUse} title="Terms Of Use" contents={termOfUseContent}/>
			<ViewOnlyDialog open={isPrivacyPolOpen} onClose={closePrivacyPolicy} title="Privacy Policy" contents={privacyPolicyContent}/>
		</FormGroup>
	)
}


