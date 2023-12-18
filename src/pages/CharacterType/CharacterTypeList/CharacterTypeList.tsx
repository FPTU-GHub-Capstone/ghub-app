import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useParams } from 'react-router'

import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { characterTypeFetch } from '../../../redux/slices/characterTypeSlide'

import { columns } from './components/TableColumn'


export default function CharacterTypeList() {
	const dispatch = useAppDispatch()
	const characterTypeList = useAppSelector(({ characterType }) => characterType.characterTypeList)
	const { gameId } = useParams()
	
	useEffect(() => {
		dispatch(characterTypeFetch(gameId))
		// console.log(`@list:: ${characterTypeList}`)
	}, [dispatch, gameId])

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
				// rowHeight={200}
			/>
		</Box>
	)
}
