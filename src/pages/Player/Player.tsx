import {
	Container,
	Box,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { playersFetch } from '../../redux/slices/playerSlice'

import { columns } from './components/TableColumn'


export default function Player() {

	const dispatch = useAppDispatch()
	const { gameId } = useParams()

	const players = useAppSelector(({ player }) => player.playerList)
	useEffect(() => {
		dispatch(playersFetch(gameId))
		// console.log(`@player:: ${players}`)
	}, [dispatch, gameId])

	return (
		<>
			<Container>
				<Box sx={{ minWidth: 800, height: 600, mt: 2 }}>
					<DataGrid
						rows={players}
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
						// disableRowSelectionOnClick
					/>
				</Box>
			</Container>
		</>
	)
}
