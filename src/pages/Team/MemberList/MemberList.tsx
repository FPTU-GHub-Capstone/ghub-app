import { Box, Container, Stack, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { useDialog } from '../../../hooks/useDialog'
import { membersFetch } from '../../../redux/slices/teamSlide'

import { columns } from './components/TableColumn'


export const MemberList = () => {
	const dispatch = useAppDispatch()
	const { gameId } = useParams()
	const [isOpenAssign, handleOpenAssign, handleCloseAssign] = useDialog()

	const members = useAppSelector(({ team }) => team.memberList)
	useEffect(() => {
		dispatch(membersFetch(gameId))
		// console.log(`@members:: ${members}`)
	}, [dispatch, gameId])

	return (
		<Box sx={{ minWidth: 800, height: 600, mt: 2 }}>
			<DataGrid
				rows={members}
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
				checkboxSelection
				// disableRowSelectionOnClick
			/>
		</Box>
	)
}
