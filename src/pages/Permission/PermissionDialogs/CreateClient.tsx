import { Dialog, Slide } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import _ from 'lodash'

import { Client, HttpStatusCode } from '../../../common'
import { generateClientId, generateClientSecret } from '../../../utils/generator'
import { convertToArrayScope, createClient } from '../../../services/ClientService'
import { initScopes } from '../../../mock/permissions'
import { useAppDispatch } from '../../../redux/hook'
import { clientsFetch } from '../../../redux/slices/clientSlice'
import { showError } from '../../../utils/toast'

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
	const { register, handleSubmit, formState: { errors }, setValue } = form
	const [permissionList, setPermissionList] = useState(_.cloneDeep(initScopes))
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<Client> = async(data) => {
		const requestBody: Client = {
			...data,
			scope: convertToArrayScope(
				localStorage.getItem('gameId'),
				permissionList,
			),
		}
		if(requestBody.scope.length == 0) {
			showError('Scope is required!')
			return
		}
		console.log(`@reqBody:: ${JSON.stringify(requestBody, undefined, 4)}`)

		const response = await createClient(requestBody)
		if(response.status == HttpStatusCode.CREATED) {
			setPermissionList(_.cloneDeep(initScopes))
			dispatch(clientsFetch())
			handleCloseAssignDialog()
		}
	}

	useEffect(() => {
		if(!isOpenAssignDialog) setPermissionList(_.cloneDeep(initScopes))
	}, [isOpenAssignDialog])

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
