import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { ContactFormType } from '../types'

import ContactFormTextField from './ContactFormTextField'


type MessageTextFieldProps = {
	errors: FieldErrors<ContactFormType>,
	register: UseFormRegister<ContactFormType>,
};

const MessageTextField: React.FC<MessageTextFieldProps> = ({ errors, register }) => (
	<ContactFormTextField
		id="message"
		label="Message"
		width="100%"
		autoComplete="off" 
		multiline  minRows={5} maxRows={7} 
		{...register('message', { required: 'Please enter your message' })}
		error={Boolean(errors.message)}
		helperText={errors.message?.message ? String(errors.message.message) : ''}
	/>
)

export default MessageTextField
