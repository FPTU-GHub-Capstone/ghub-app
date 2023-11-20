import { Box } from '@mui/material'
import { DataGrid, GridRowHeightParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { clientsFetch } from '../../../redux/slices/clientSlice'

import { columns } from './components/TableColumn'


export default function PermissionList() {
	const dispatch = useAppDispatch()
	const clientList = useAppSelector(({ client }) => client.clientList)
	
	useEffect(() => {
		dispatch(clientsFetch())
		// console.log(`@list:: ${clientList}`)
	}, [dispatch])
	
	return (
		<Box sx={{ minWidth: 800, height: 700, mt: 2 }}>
			<DataGrid
				rows={clientList}
				columns={columns}
				getRowId={(row) => row._id}
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
