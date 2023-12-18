import { Delete, Edit } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useDialog } from '../../../../hooks/useDialog'
import ConfirmDialog from '../../../../components/ConfirmDialog'
import { RestService } from '../../../../services/RestService'
import config from '../../../../config'
import { HttpStatusCode, User } from '../../../../common'
import { showSuccess } from '../../../../utils/toast'
import { useAppDispatch } from '../../../../redux/hook'
import { membersFetch } from '../../../../redux/slices/teamSlide'


export default function GridAction({ rowData }: { rowData: User }) {
	const [isOpenDelete, handleOpenDelete, handleCloseDelete] = useDialog()
	const { gameId } = useParams()
	const dispatch = useAppDispatch()

	const handleDeleteMember = async () => {
		const response = await RestService.getInstance().put(
			`${config.IDP_URL}/users/${rowData.uid}/remove-scope`,
			{
				scope: [
					`games:${gameId}:get`,
					`games:${gameId}:update`,
					`games:${gameId}:delete`,
				]
			}
		)

		if (response.status == HttpStatusCode.SUCCESS) {
			showSuccess('Removed a member from the team')
			dispatch(membersFetch(gameId))
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
				title="Delete Member"
				message="Are you sure? Do yo really want to delete this member. This
				process can not be undone."
				onCancel={handleCloseDelete}
				onConfirm={handleDeleteMember}
			/>
		</>
	)
}
