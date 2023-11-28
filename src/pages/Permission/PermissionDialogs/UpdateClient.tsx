import { Dialog, Slide } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import _ from 'lodash'

import { Client, HttpStatusCode } from '../../../common'
import { initScopes } from '../../../mock/permissions'
import { convertArrayToRecordScope, convertToArrayScope, updateClient } from '../../../services/ClientService'
import { useAppDispatch } from '../../../redux/hook'
import { clientsFetch } from '../../../redux/slices/clientSlice'
import { showSuccess } from '../../../utils/toast'

import ClientForm from './components/ClientForm'
import Header from './components/DialogHeader'


type Props = {
	data: Client,
	isOpenUpdate: boolean,
	handleCloseUpdate: () => void,
}

const Transition = React.forwardRef(function Transition(
	props: {
		children: React.ReactElement,
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function UpdateClient({isOpenUpdate, handleCloseUpdate, data}: Props) {
	const scopes = (data.scope as string).split(' ')
	const form = useForm<Client>({
		mode: 'onChange',
		defaultValues: {
			gameId: data.gameId,
			name: data.name,
			clientId: data.clientId,
			clientSecret: data.clientSecret,
		}
	})
	const { register, handleSubmit, formState: { errors }, setValue } = form
	const list = convertArrayToRecordScope(scopes)
	const [permissionList, setPermissionList] = useState(_.cloneDeep(list))
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<Client> = async (values) => {
		const requestBody: Client = ({...values, scope: convertToArrayScope(permissionList)})
		// console.log(`@reqBody:: ${requestBody.clientId}`)

		const response = await updateClient(requestBody, data.clientId)
		if(response.status == HttpStatusCode.SUCCESS) {
			setPermissionList(_.cloneDeep(initScopes))
			dispatch(clientsFetch())
			handleCloseUpdate()
			showSuccess('Update successfully.')
		}
	}

	// console.log(initScopes)
	useEffect(() => {
		if(!isOpenUpdate) setPermissionList(_.cloneDeep(initScopes))
		
	}, [isOpenUpdate, list])

	return (
		<Dialog
			fullScreen
			open={isOpenUpdate}
			onClose={handleCloseUpdate}
			TransitionComponent={Transition}
		>
			<Header 
				titleDialog='Update Client' 
				titleBtn='Save' 
				handleCloseDialog={handleCloseUpdate} 
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
