import { Box } from '@mui/material'
import { DataGrid, GridRowHeightParams } from '@mui/x-data-grid'
import React from 'react'

import { permissionList } from '../../../mock/permissions'

import { columns } from './components/TableColumn'


export default function PermissionList() {
	return (
		<Box sx={{ minWidth: 800, height: 700, mt: 2 }}>
			<DataGrid
				rows={permissionList}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				pageSizeOptions={[5, 10, 25]}
				// checkboxSelection
				disableRowSelectionOnClick
				// rowHeight={200}
			/>
		</Box>
	)
}
