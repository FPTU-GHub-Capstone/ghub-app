import { Box } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import InputField from '../../../../components/TextFields/InputField'
import { EMAIL_REGEX } from '../../../../common'
import { EmailTextField } from '../../../../components/TextFields/EmailTextField'


type PermissionFormType = {
	email: string,
}

export default function PermissionForm() {
	const form = useForm<PermissionFormType>({
		mode: 'onChange',
		defaultValues: {
			email: '',
		}
	})
	const { watch, register, handleSubmit, formState: { errors }, control } = form
	
	const onSubmit = (data: PermissionFormType) => {
		console.log({...data})
	}
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
		}}
		component='form'
		onSubmit={handleSubmit(onSubmit)}
		>
			<InputField 
				errors={errors}
				register={register}
				name='email1'
				label='Email Address'
				type='text'
				requiredMsg='Email is Required'
				pattern={{
					value: EMAIL_REGEX,
					message: 'Not a valid email address',
				}}
			/>

			<DevTool control={control} />
		</Box>
	)
}
