import React from 'react'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { faker } from '@faker-js/faker'

import InputField from '../../../../components/TextFields/InputField'


type ClientFormType = {
	gameId: string,
	clientId: string,
	clientSecret: string,
	scopes: string,
}

export default function ClientForm() {
	const form = useForm<ClientFormType>({
		mode: 'onChange',
		defaultValues: {
			gameId: faker.string.uuid(),
			clientId: faker.string.uuid(),
			clientSecret: ''
		}
	})
	const { watch, register, handleSubmit, formState: { errors }, control } = form
	
	const onSubmit = (data: ClientFormType) => {
		console.log({...data})
	}
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			margin: 5
		}}
		component='form'
		onSubmit={handleSubmit(onSubmit)}
		>
			<InputField 
				disabled
				errors={errors}
				register={register}
				name='gameId'
				label='Game ID'
				size='small'
			/>

			<InputField 
				disabled
				errors={errors}
				register={register}
				name='clientId'
				label='Client ID'
				size='small'
			/>

			<InputField 
				errors={errors}
				register={register}
				name='clientSecret'
				label='Client Secret'
				size='small'
			/>
		</Box>
	)
}
