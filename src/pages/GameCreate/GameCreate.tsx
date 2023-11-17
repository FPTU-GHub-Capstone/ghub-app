import { Container, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

import config from '../../config'
import { Game } from '../../common'
import RestService from '../../services/RestService'
import { useDialog } from '../../hooks/useDialog'

import { GameCreateForm } from './GameCreateForm'
import { GameCreateInputType } from './GameCreateForm/types'
import { SnackStatus } from './components/SnackStatus'


export const GameCreate = ({ title }: {title: string}) => {
	const [game, setGame] = useState<Game>()
	const [isSnackSuccessOpen, handleOpenSnackSuccess, handleCloseSnackSuccess] = useDialog()
	const [isSnackErrorOpen, handleOpenSnackError, handleCloseSnackError] = useDialog()

	const onSubmit = (data: GameCreateInputType) => {
		const gameData: Game = ({id: 'a', ...data})
		setGame(gameData)
		postData()
	}

	const postData = async () => {
		let isError = false
		try {
			await RestService.post(`${config.GMS_URL}/games`, game)
		} catch (error) {
			console.error('Error posting Game with: ', error)
			isError = true
		}
		if (isError) handleOpenSnackError()
		else handleOpenSnackSuccess()
	}

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return
		handleCloseSnackSuccess()
		handleCloseSnackError()
	}

	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
			</Stack>

			<GameCreateForm onSubmit={onSubmit} />

			<SnackStatus successPop={isSnackSuccessOpen} errorPop={isSnackErrorOpen} handleClose={handleClose} />
		</Container>
	)
}
