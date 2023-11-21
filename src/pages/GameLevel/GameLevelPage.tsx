/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'


import config from '../../config'
import RestService from '../../services/RestService'
import { Level } from '../../common/types'
import ConfirmDialog from '../../components/ConfirmDialog'

import { GameLevelList } from './GameLevelList'


type GameLevelResponse = {
	isError: boolean,
	message?: string,
	result: Level[],
};

export const GameLevelPage = ({ title }: { title: string }) => {
	const [gameLevels, setGameLevels] = useState<Level[]>([])
	const [originalGameLevels, setOriginalGameLevels] = useState<Level[]>([])
	const [gameId, setGameId] = useState<string | null>(null)
	const [isConfirmOpen, setConfirmOpen] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		setGameId(extractedGameId)
		fetchGameLevels(extractedGameId)
	}, [location.pathname])



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
		setConfirmOpen(false)
		
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

		const newLevels = gameLevels.filter((level) => !originalGameLevels.some((origLevel) => origLevel.id === level.id))
		for (const newLevel of newLevels) {
			try {
				await RestService.post(`${config.GMS_URL}/levels`, newLevel)
			} catch (error) {
				console.error('Error adding new game Level:', error)
			}
		}

		fetchGameLevels(gameId)
	}

	const handleChangeGameLevel = ( newGameLevel: Level[] ) => { 
		setGameLevels(newGameLevel) 
	}
	const isDataChanged = (JSON.stringify(gameLevels) !== JSON.stringify(originalGameLevels)) ? true : false 

	return (
		<>
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				</Stack>

				<GameLevelList 
					gameLevels={gameLevels} setGameLevels={handleChangeGameLevel} 
					setConfirmOpen={setConfirmOpen} isDataChanged={isDataChanged} 
				/>

				<ConfirmDialog
					open={isConfirmOpen}
					title="Confirm Save Data"
					message="Are you sure you want to save current state of Game Levels ?"
					onCancel={() => setConfirmOpen(false)}
					onConfirm={handleConfirm}
				/>
			</Container>
		</>
	)
}
