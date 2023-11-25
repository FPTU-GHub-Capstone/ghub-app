import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { characterTypeFetch } from '../../../redux/slices/characterTypeSlice'

import { columns } from './components/TableColumn'


export default function CharacterTypeList() {
	const dispatch = useAppDispatch()
	const characterTypeList = useAppSelector(({ characterType }) => characterType.characterTypeList)
	
	useEffect(() => {
		dispatch(characterTypeFetch())
		// console.log(`@list:: ${characterTypeList}`)
	}, [dispatch])

	return (
		<Box sx={{ minWidth: 800, height: 700, mt: 2 }}>
			<DataGrid
				rows={characterTypeList}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				pageSizeOptions={[5, 10, 25]}
				disableRowSelectionOnClick
				rowHeight={200}
			/>
		</Box>
	)
}
