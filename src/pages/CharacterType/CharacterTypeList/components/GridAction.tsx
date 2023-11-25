import { Tooltip } from '@mui/material'
import React from 'react'
import { Edit, Delete } from '@mui/icons-material'
import { GridActionsCellItem } from '@mui/x-data-grid'

import { useDialog } from '../../../../hooks/useDialog'
import { Client, HttpStatusCode } from '../../../../common'
import { deleteClient } from '../../../../services/ClientService'
import { useAppDispatch } from '../../../../redux/hook'
import { clientsFetch } from '../../../../redux/slices/clientSlice'
import ConfirmDialog from '../../../../components/ConfirmDialog'


export default function GridAction({rowData}: {rowData: Client}) {
	const [isOpenUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()
	const [isOpenDelete, handleOpenDelete, handleCloseDelete] = useDialog()
	const dispatch = useAppDispatch()

	const handleDeleteClient = async() => {
		const { status } = await deleteClient(rowData.clientId)
		if(status == HttpStatusCode.NO_CONTENT) {
			dispatch(clientsFetch())
			handleCloseDelete()
		}
	}

	return (
		<>
			<GridActionsCellItem
				key="edit"
				icon={<Tooltip title="Edit"><Edit /></Tooltip>}
				label="Edit"
				className="textPrimary"
				onClick={handleOpenUpdate}
				color="inherit"
			/>
			<GridActionsCellItem
				key="delete"
				icon={<Tooltip title="Delete"><Delete /></Tooltip>}
				label="Delete"
				onClick={handleOpenDelete}
				color="inherit"
			/>

			<ConfirmDialog 
				open={isOpenDelete}
				title="Delete Client"
				message="Are you sure? Do yo really want to delete this client. This
				process can not be undone."
				onCancel={handleCloseDelete}
				onConfirm={handleDeleteClient}
			/>
		</>
	)
}
