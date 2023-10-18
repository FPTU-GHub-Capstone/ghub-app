import React from 'react'
import {
	FormControl,
	InputLabel,
	FormHelperText,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import InputBase, { InputBaseProps } from '@mui/material/InputBase'

import { textFieldCustomStyles } from '../styles'


interface IContactFormTextFieldProps extends InputBaseProps {
	label: string;
	helperText?: React.ReactNode;
	width?: string;
}

const CustomizedInputBase = styled(InputBase)(({ theme }) => ({
	...textFieldCustomStyles,
}))

const ContactFormTextField = React.forwardRef(function ContactFormTextField(
	{
		label,
		helperText,
		width,
		...inputBaseProps
	}: IContactFormTextFieldProps,
	ref
) {
	return (
		<FormControl variant="standard" sx={{marginBottom: '25px', width: width }}>
			<InputLabel
				shrink
				htmlFor={inputBaseProps.id}
				sx={{
					color: '#B8ADA7',
					fontSize: '18px',
					'&.Mui-focused': { color: '#ececec' },
				}}
			>
				{label}
			</InputLabel>
			<CustomizedInputBase {...inputBaseProps} ref={ref} />
			<FormHelperText error={Boolean(inputBaseProps.error)} sx={{ color: '#ececec' }}>
				{helperText}
			</FormHelperText>
		</FormControl>
	)
})

ContactFormTextField.displayName = 'ContactFormTextField'

export default ContactFormTextField
