import { Dialog, Drawer } from '@mui/material'
import React, { useState } from 'react'

import DialogHeader from '../../../components/DialogHeader'

import AddMemberForm from './components/AddMemberForm'


type Props = {
	isOpenAdd: boolean,
	handleCloseAdd: () => void,
}

export default function AddMember({ isOpenAdd, handleCloseAdd }: Props) {
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

			<DialogHeader
				titleDialog='Add Member'
				titleBtn='Save'
				handleCloseDialog={handleCloseAdd}
				// handleSubmit={handleSubmit}
				// onSubmit={onSubmit as SubmitHandler<FieldValues>}
			/>

			<AddMemberForm />
		</Drawer>
	)
}
