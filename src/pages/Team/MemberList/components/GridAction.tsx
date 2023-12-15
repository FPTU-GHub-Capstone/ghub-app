import { Delete, Edit } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'


export default function GridAction() {
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
				// onClick={handleOpenDelete}
				color="inherit"
			/>
		</>
	)
}