import { Visibility } from '@mui/icons-material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'


export default function GridAction() {
	return (
		<>
			<GridActionsCellItem
				key="view"
				icon={<Visibility />}
				label="View"
				className="textPrimary"
				// onClick={handleViewDetail}
				color="inherit"
			/>
		</>
	)
}
