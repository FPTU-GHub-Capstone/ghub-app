/* eslint-disable max-lines-per-function */
import { useState, useEffect, useCallback } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import config from '../../config'
import RestService from '../../services/RestService'
import { Game, GameServer } from '../../common/types'
import { useDialog } from '../../hooks/useDialog'

import { GameServerList } from './GameServerList'
import { ServerAddBtn } from './components/ServerAddBtn' // Updated import for clarity
import CreateServerDialog from './CreateServerDialog'


type GameServerResponse = {
	isError: boolean,
	message?: string,
	result: GameServer[],
};

type GameResponse = {
	isError: boolean,
	message?: string,
	result: Game,
};

export const GameServerPage = ({ title }: { title: string }) => {
	const [gameServers, setGameServers] = useState<GameServer[]>([])
	const [originalGameServers, setOriginalGameServers] = useState<GameServer[]>([])
	const [gameId, setGameId] = useState<string | null>(null)
	const [isServerAddFormOpen, handleOpenServerAddForm, handleCloseServerAddForm] = useDialog()
	const [isChanged, setChanged] = useState(0)
	const [isUpdateRequired, setUpdateRequired] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		setGameId(extractedGameId)
		fetchGame(extractedGameId)
		fetchGameServers(extractedGameId)
	}, [location.pathname])

	useEffect(() => {
		console.log(isChanged)
		if (isChanged > 0) {
			console.log('Doing fetch')
			fetchGameServers(gameId)
		}
	}, [isChanged, gameId])

	const fetchGameServers = async (inputGameId: string) => {
		try {
			const gameServerResponse = await RestService.get<GameServerResponse>(
				`${config.GMS_URL}/games/${inputGameId}/game-servers`
			)
			const gameServerResult = gameServerResponse.data.result
			setGameServers(gameServerResult)
			setOriginalGameServers(gameServerResult)
		} catch (error) {
			console.error('Error fetching game server data:', error)
		}
	}

	const fetchGame = async (inputGameId: string) => {
		try {
			const gameResponse = await RestService.get<GameResponse>(`${config.GMS_URL}/games/${inputGameId}`)
			const gameResult: Game = gameResponse.data.result
			localStorage.setItem('currentGame', JSON.stringify(gameResult))
		} catch (error) {
			console.error('Error fetching game data:', error)
		}
	}

	const updateGameServers = useCallback(async () => {
		for (const originalServer of originalGameServers) {
			const serverId = originalServer.id
			const updatedGameServer = gameServers.find(server => server.id === serverId)

			if (updatedGameServer) {
				if (JSON.stringify(updatedGameServer) !== JSON.stringify(originalServer)) {
					try {
						await RestService.put(`${config.GMS_URL}/game-servers/${serverId}`, updatedGameServer)
					} catch (error) {
						console.error(`Error updating game server with id ${serverId}:`, error)
					}
				}
			}
		}
		fetchGameServers(gameId)
	}, [originalGameServers, gameServers, gameId])

	useEffect(() => {
		if (isUpdateRequired) {
			updateGameServers()
			setUpdateRequired(false)
		}
	}, [isUpdateRequired, updateGameServers])

	const handleChangeGameServer = (newGameServer: GameServer[]) => {
		setGameServers(newGameServer)
	}

	return (
		<>
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				</Stack>

				<Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
					<ServerAddBtn handleOnClick={handleOpenServerAddForm} />
				</Stack>

				<GameServerList
					gameServers={gameServers}
					setGameServers={handleChangeGameServer}
					onRowUpdateCompleted={() => setUpdateRequired(true)}
				/>

				{isServerAddFormOpen && 
					<CreateServerDialog
						isOpenCreateServerDialog={isServerAddFormOpen}
						handleCloseCreateServerDialog={handleCloseServerAddForm}
						toggleChanged={() => {
							console.log('toggle Changed')
							setChanged(isChanged + 1)
						}}
					/>
				}
			</Container>
		</>
	)
}
