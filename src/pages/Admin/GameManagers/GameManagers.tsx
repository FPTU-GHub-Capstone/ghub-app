/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Box, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { usersFetch } from '../../../redux/slices/userSlide'

import { columns } from './components/TableColumn'


export default function GameManagers({ title }: { title: string }) {

	const [pathGameId, setPathGameId] = useState<string | null>(null)
	const gameUsers = useAppSelector(({ user }) => user.userList)
	const dispatch = useAppDispatch()
	// useEffect(() => {
	// 	dispatch(usersFetch(currentGameId))
	// }, [])
	
	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		setPathGameId(extractedGameId)
		dispatch(usersFetch(extractedGameId))
	}, [dispatch])

	return (
		<>
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={3}
				>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				</Stack>
				{gameUsers ? <Box sx={{ minWidth: 800, height: 600, mt: 2 }}>
					<DataGrid
						rows={gameUsers}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 10,
								},
							},
						}}
						pageSizeOptions={[5, 10, 25]}
						checkboxSelection
						getRowId={(row)=> row._id}
						// disableRowSelectionOnClick
					/>
				</Box> : <></>}
			</Container>
		</>
	)
}
