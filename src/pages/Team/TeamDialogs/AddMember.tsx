import { Box, Drawer } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../../components/DialogHeader'
import { HttpStatusCode, User } from '../../../common'
import { convertToArrayScope, setMemberPermission } from '../../../services/TeamService'
import { useAppDispatch } from '../../../redux/hook'
import { membersFetch } from '../../../redux/slices/teamSlide'

import AddMemberForm from './components/AddMemberForm'


type Props = {
	isOpenAdd: boolean,
	handleCloseAdd: () => void,
}

export default function AddMember({ isOpenAdd, handleCloseAdd }: Props) {
	const form = useForm()
	const { handleSubmit } = form
	const [members, setMembers] = useState<User[]>()
	const [permission, setPermission] = useState([true, false, false])
	const { gameId } = useParams()
	const dispatch = useAppDispatch()

	const onSubmit = async() => {
		console.log(permission)
		const scope = convertToArrayScope(gameId, permission)
		const response = await setMemberPermission(members[0].uid, scope)
		if(response.status == HttpStatusCode.SUCCESS) {
			dispatch(membersFetch(gameId))
			handleCloseAdd()
		}
	}

	return (
		<Drawer
			anchor='right'
			PaperProps={{
				style: {
					width: '40vw'
				},
			}}
			open={isOpenAdd}
			onClose={handleCloseAdd}
		>
			<Box component="form" onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader
					titleDialog='Add Member'
					titleBtn='Save'
					handleCloseDialog={handleCloseAdd}
				/>

				<AddMemberForm 
					members={members}
					setMembers={setMembers}
					permission={permission}
					setPermission={setPermission}
				/>
			</Box>
		</Drawer>
	)
}
