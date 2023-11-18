/* eslint-disable max-lines-per-function */
import { Dialog, Slide } from '@mui/material'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ACCESS_TOKEN, Client, RequestHeaders } from '../../../common'
import RestService from '../../../services/RestService'
import config from '../../../config'
import { generateClientId, generateClientSecret } from '../../../utils/generator'
import { convertToArrayScope, createClient } from '../../../services/ClientService'
import { initScopes } from '../../../mock/permissions'

import ClientForm from './components/ClientForm'
import Header from './components/Header'


type Props = {
	isOpenAssignDialog: boolean,
	handleCloseAssignDialog: () => void,
}

const Transition = React.forwardRef(function Transition(
	props: {
		children: React.ReactElement,
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function CreateClient({ isOpenAssignDialog, handleCloseAssignDialog }: Props) {
	const form = useForm<Client>({
		mode: 'onChange',
		defaultValues: {
			gameId: 'cece31d1-7fd0-4fd6-2896-08dbe098747f',
			clientId: generateClientId(),
			clientSecret: generateClientSecret(),
		}
	})
	const { watch, register, handleSubmit, formState: { errors }, control, setValue } = form
	const [requestBody, setRequestBody] = useState<Client>()
	const [permissionList, setPermissionList] = useState(initScopes)

	const onSubmit: SubmitHandler<Client> = (data) => {
		const body: Client = ({...data, scope: convertToArrayScope(permissionList)})
		setRequestBody(body)

		console.log(requestBody)
		createClient(requestBody)
	}

	return (
		<Dialog
			fullScreen
			open={isOpenAssignDialog}
			onClose={handleCloseAssignDialog}
			TransitionComponent={Transition}
		>
			
			<Header 
				titleDialog='Create Client' 
				titleBtn='Save' 
				handleCloseDialog={handleCloseAssignDialog} 
				handleSubmit={handleSubmit} 
				onSubmit={onSubmit} 
			/>

			<ClientForm 
				errors={errors} 
				register={register} 
				setValue={setValue} 
				handleSubmit={handleSubmit} 
				onSubmit={onSubmit} 
				permissionList={permissionList}
				setPermissionList={setPermissionList}
			/>
		
		</Dialog>
	)
}
