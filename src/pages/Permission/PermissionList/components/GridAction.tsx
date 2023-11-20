import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Edit, Delete } from '@mui/icons-material'
import { GridActionsCellItem } from '@mui/x-data-grid'

import { useDialog } from '../../../../hooks/useDialog'
import UpdatePermission from '../../PermissionDialogs/UpdateClient'


export default function GridAction() {
	const [isOpenUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()

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
				// onClick={handleDeleteClick}
				color="inherit"
			/>

			{isOpenUpdate && 
				<UpdatePermission 
					isOpenUpdate={isOpenUpdate}
					handleCloseUpdate={handleCloseUpdate}
				/>
			}
		</>
	)
}
