/* eslint-disable max-lines-per-function */
import { Dialog, Slide } from '@mui/material'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Client } from '../../../common'
import { generateClientId, generateClientSecret } from '../../../utils/generator'
import { convertToArrayScope, createClient } from '../../../services/ClientService'
import { initScopes } from '../../../mock/permissions'
import { useAppSelector } from '../../../redux/hook'
import { getCurrentGame } from '../../../redux/slices/gameSlice'

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
			gameId: localStorage.getItem('gameId'),
			clientId: generateClientId(),
			clientSecret: generateClientSecret(),
		}
	})
	const { watch, register, handleSubmit, formState: { errors }, control, setValue } = form
	const [permissionList, setPermissionList] = useState(initScopes)

	const onSubmit: SubmitHandler<Client> = (data) => {
		const requestBody: Client = ({...data, scope: convertToArrayScope(permissionList)})
		// console.log(`@reqBody:: ${requestBody}`)
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
				permissionList={permissionList}
				setPermissionList={setPermissionList}
			/>
		
		</Dialog>
	)
}
