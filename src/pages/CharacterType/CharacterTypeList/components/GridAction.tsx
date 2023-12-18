import { Tooltip } from '@mui/material'
import React from 'react'
import { Edit, Delete } from '@mui/icons-material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { useParams } from 'react-router'

import { useDialog } from '../../../../hooks/useDialog'
import { CharacterType, HttpStatusCode } from '../../../../common'
import { useAppDispatch } from '../../../../redux/hook'
import ConfirmDialog from '../../../../components/ConfirmDialog'
import { deleteCharacterType } from '../../../../services/CharacterTypeService'
import { characterTypeFetch } from '../../../../redux/slices/characterTypeSlide'
import { showSuccess } from '../../../../utils/toast'


export default function GridAction({rowData}: {rowData: CharacterType}) {
	// const [isOpenUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()
	const [isOpenDelete, handleOpenDelete, handleCloseDelete] = useDialog()
	const dispatch = useAppDispatch()
	const { gameId } = useParams()

	const handleDeleteClient = async() => {
		const { status } = await deleteCharacterType(gameId, rowData.id)
		if(status == HttpStatusCode.NO_CONTENT) {
			showSuccess('Character Type has been deleted.')
			dispatch(characterTypeFetch(gameId))
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
				// onClick={handleOpenUpdate}
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
				message="Are you sure? Do yo really want to delete this character type. This
				process can not be undone."
				onCancel={handleCloseDelete}
				onConfirm={handleDeleteClient}
			/>
		</>
	)
}
