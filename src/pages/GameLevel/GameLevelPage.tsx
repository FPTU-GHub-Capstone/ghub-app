/* eslint-disable max-lines-per-function */
import { useState, useEffect, useCallback } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'


import config from '../../config'
import { RestService } from '../../services/RestService'
import { Game, Level } from '../../common/types'
import { useDialog } from '../../hooks/useDialog'

import { GameLevelList } from './GameLevelList'
import { LevelAddBtn } from './components/LevelAddBtn'
import CreateLevelDialog from './CreateLevelDialog'


type GameLevelResponse = {
	isError: boolean,
	message?: string,
	result: Level[],
};

type GameResponse = {
	isError: boolean,
	message?: string,
	result: Game,
};

const restSvc = RestService.getInstance()

export const GameLevelPage = ({ title }: { title: string }) => {
	const [gameLevels, setGameLevels] = useState<Level[]>([])
	const [originalGameLevels, setOriginalGameLevels] = useState<Level[]>([])
	const [gameId, setGameId] = useState<string | null>(null)
	const [isLevelAddFormOpen, handleOpenLevelAddForm, handleCloseLevelAddForm] = useDialog()
	const [isChanged, setChanged] = useState(0)
	const [isUpdateRequired, setUpdateRequired] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		setGameId(extractedGameId)
		fetchGame(extractedGameId)
		fetchGameLevels(extractedGameId)
	}, [location.pathname])

	useEffect(() => {
		if (isChanged > 0) {
			fetchGameLevels(gameId)
		}
	}, [isChanged, gameId])

	const fetchGameLevels = async (inputGameId : string) => {
		try {
			const gameLevelResponse = await restSvc.get<GameLevelResponse>(`${config.GMS_URL}/games/${inputGameId}/levels`)
			const gameLevelResult = gameLevelResponse.data.result
			setGameLevels(gameLevelResult)
			setOriginalGameLevels(gameLevelResult)

		} catch (error) {
			console.error('Error fetching game Levels data:', error)
		}
	}

	const fetchGame = async (inputGameId : string) => {
		try {
			const GameResponse = await restSvc.get<GameResponse>(`${config.GMS_URL}/games/${inputGameId}`)
			const gameResult: Game = GameResponse.data.result
			localStorage.setItem('currentGame', JSON.stringify(gameResult)) 
		} catch (error) {
			console.error('Error fetching game Levels data:', error)
		}
	}

	const updateGameLevels = useCallback(async () => {
		for (const originalLevel of originalGameLevels) {
			const gameLevelId = originalLevel.id
			const updatedGameLevel = gameLevels.find(level => level.id === gameLevelId)

			if (updatedGameLevel) {
				if (JSON.stringify(updatedGameLevel) !== JSON.stringify(originalLevel)) {
					const payload = {
						'description': updatedGameLevel.description,
						'levelUpPoint': updatedGameLevel.levelUpPoint
					}					
					try {
						await restSvc.put(`${config.GMS_URL}/levels/${gameLevelId}`, payload)
					} catch (error) {
						console.error(`Error updating game Level with id ${gameLevelId}:`, error)
					}
					
				}
				
			}
		}
		fetchGameLevels(gameId)
	}, [originalGameLevels, gameLevels, gameId])

	useEffect(() => {
		if (isUpdateRequired) {
			updateGameLevels()
			setUpdateRequired(false)
		}
	}, [isUpdateRequired, updateGameLevels])

	const handleChangeGameLevel = ( newGameLevel: Level[] ) => { 
		setGameLevels(newGameLevel) 
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
					<LevelAddBtn handleOnClick={handleOpenLevelAddForm}/>
				</Stack>

				<GameLevelList 
					gameLevels={gameLevels} setGameLevels={handleChangeGameLevel} 
					onRowUpdateCompleted={() => setUpdateRequired(true)}
				/>

				{isLevelAddFormOpen &&
					<CreateLevelDialog
						isOpenCreateLevelDialog={isLevelAddFormOpen}
						handleCloseCreateLevelDialog={handleCloseLevelAddForm}
						toggleChanged={() => setChanged(isChanged + 1)}
						currentLevelCap={gameLevels.length}
					/>
				}
			</Container>
		</>
	)
}
