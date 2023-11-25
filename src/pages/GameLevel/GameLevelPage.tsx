/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'


import config from '../../config'
import RestService from '../../services/RestService'
import { Level } from '../../common/types'
import { useDialog } from '../../hooks/useDialog'

import { GameLevelList } from './GameLevelList'
import { LevelAddBtn } from './components/LevelAddBtn'
import CreateLevelDialog from './CreateLevelDialog'


type GameLevelResponse = {
	isError: boolean,
	message?: string,
	result: Level[],
};

export const GameLevelPage = ({ title }: { title: string }) => {
	const [gameLevels, setGameLevels] = useState<Level[]>([])
	const [originalGameLevels, setOriginalGameLevels] = useState<Level[]>([])
	const [gameId, setGameId] = useState<string | null>(null)
	const [isLevelAddFormOpen, handleOpenLevelAddForm, handleCloseLevelAddForm] = useDialog()
	const [isAdded, setAdded] = useState<boolean>(false)
	const location = useLocation()

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		setGameId(extractedGameId)
		localStorage.setItem('gameId', extractedGameId) // Set the gameId in localStorage
		fetchGameLevels(extractedGameId)
	}, [location.pathname])

	useEffect(() => {
		console.log('isAdded is toggled')
		fetchGameLevels(gameId)
	}, [isAdded, gameId])



	const fetchGameLevels = async (inputGameId : string) => {
		try {
			const gameLevelResponse = await RestService.get<GameLevelResponse>(`${config.GMS_URL}/games/${inputGameId}/levels`)
			
			const gameLevelResult = gameLevelResponse.data.result


			setGameLevels(gameLevelResult)
			setOriginalGameLevels(gameLevelResult)
		} catch (error) {
			console.error('Error fetching game Levels data:', error)
		}
	}

	const handleConfirm = async () => {
		handleCloseLevelAddForm()
		
		for (const originalLevel of originalGameLevels) {
			const gameLevelId = originalLevel.id

			const updatedGameLevel = gameLevels.find(level => level.id === gameLevelId)

			if (updatedGameLevel) {
				if ((JSON.stringify(updatedGameLevel) !== JSON.stringify(originalLevel))) {
					try {
						await RestService.put(`${config.GMS_URL}/levels/${gameLevelId}`, updatedGameLevel)
					} catch (error) {
						console.error(`Error updating game Level with id ${gameLevelId}:`, error)
					}
				}
			} else {
				try {
					await RestService.delete(`${config.GMS_URL}/levels/${gameLevelId}`)
				} catch (error) {
					console.error(`Error deleting game Level with id ${gameLevelId}:`, error)
				}
			}
		}

		fetchGameLevels(gameId)
	}

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
				/>

				{isLevelAddFormOpen &&
					<CreateLevelDialog
						isOpenCreateLevelDialog={isLevelAddFormOpen}
						handleCloseCreateLevelDialog={handleCloseLevelAddForm}
						toggleAdded={() => setAdded(!isAdded)}
					/>
				}
			</Container>
		</>
	)
}
