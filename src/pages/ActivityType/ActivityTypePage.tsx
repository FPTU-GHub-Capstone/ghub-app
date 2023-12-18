/* eslint-disable max-lines-per-function */
import { useState, useEffect, useCallback } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import config from '../../config'
import { RestService } from '../../services/RestService'
import { ActivityType, Character, Game, HttpResponseGMS } from '../../common/types'
import { useDialog } from '../../hooks/useDialog'

import { ActivityTypeList } from './ActivityTypeList'
import { ActivityTypeAddBtn } from './components/ActivityTypeAddBtn' // Updated import for clarity
import CreateActivityTypeDialog from './CreateActivityTypeDialog'


const restSvc = RestService.getInstance()

export const ActivityTypePage = ({ title }: { title: string }) => {
	const [activityTypes, setActivityTypes] = useState<ActivityType[]>([])
	const [originalActivityTypes, setOriginalActivityTypes] = useState<ActivityType[]>([])
	const [gameCharactersData, setGameCharactersData] = useState<Character[]>([])
	const [isActivityTypeAddFormOpen, handleOpenActivityTypeAddForm, handleCloseActivityTypeeAddForm] = useDialog()
	const [isChanged, setChanged] = useState(0)
	const [isUpdateRequired, setUpdateRequired] = useState(false)
	const {gameId} = useParams()

	useEffect(() => {
		fetchGame(gameId)
		fetchActivityTypes(gameId)
		fetchCharacters(gameId)
	}, [gameId])

	useEffect(() => {
		if (isChanged > 0) {
			fetchActivityTypes(gameId)
		}
	}, [isChanged, gameId])

	const fetchActivityTypes = async (inputGameId: string) => {
		try {
			const activityTypesResponse = await restSvc.get<HttpResponseGMS<ActivityType>>(
				`${config.GMS_URL}/games/${inputGameId}/activity-types`
			)
			const activityTypesResult = activityTypesResponse.data.result as ActivityType[]
			setActivityTypes(activityTypesResult)
			setOriginalActivityTypes(activityTypesResult)
		} catch (error) {
			console.error('Error fetching activity type data:', error)
		}
	}

	const fetchGame = async (inputGameId: string) => {
		try {
			const gameResponse = await restSvc.get<HttpResponseGMS<Game>>(`${config.GMS_URL}/games/${inputGameId}`)
			const gameResult: Game = gameResponse.data.result as Game
			localStorage.setItem('currentGame', JSON.stringify(gameResult))
		} catch (error) {
			console.error('Error fetching game data:', error)
		}
	}

	const fetchCharacters = async (inputGameId: string) => {
		try {
			const charactersResponse = await restSvc.get<HttpResponseGMS<Character>>(
				`${config.GMS_URL}/games/${inputGameId}/characters`
			)
			const charactersResult = charactersResponse.data.result as Character[]
			setGameCharactersData(charactersResult)
		} catch (error) {
			console.error('Error fetching characters data:', error)
		}
	}


	const updateActivityTypes = useCallback(async () => {
		for (const originalActivityType of originalActivityTypes) {
			const activityTypeId = originalActivityType.id
			const updatedActivityType = activityTypes.find(activityType => activityType.id === activityTypeId)

			if (updatedActivityType) {
				if (JSON.stringify(updatedActivityType) !== JSON.stringify(originalActivityType)) {
					try {
						await restSvc.put(`${config.GMS_URL}/games/${gameId}/activity-types/${activityTypeId}`, updatedActivityType)
					} catch (error) {
						console.error(`Error updating activity type with id ${activityTypeId}:`, error)
					}
				}
			} else {
				try {
					await restSvc.delete(`${config.GMS_URL}/games/${gameId}/activity-types/${activityTypeId}`)
				} catch (error) {
					console.error(`Error deleting activity types with id ${activityTypeId}:`, error)
				}
			}
		}
		fetchActivityTypes(gameId)
	}, [originalActivityTypes, activityTypes, gameId])

	useEffect(() => {
		if (isUpdateRequired) {
			updateActivityTypes()
			setUpdateRequired(false)
		}
	}, [isUpdateRequired, updateActivityTypes])

	const handleChangeActivityTypes = (newActivityType: ActivityType[]) => {
		setActivityTypes(newActivityType)
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
					<ActivityTypeAddBtn handleOnClick={handleOpenActivityTypeAddForm} />
				</Stack>

				{gameId &&
					<ActivityTypeList
						activityTypes={activityTypes}
						setActivityTypes={handleChangeActivityTypes}
						onRowUpdateCompleted={() => setUpdateRequired(true)}
					/>
				}

				{isActivityTypeAddFormOpen && 
					<CreateActivityTypeDialog
						isOpenCreateActivityTypeDialog={isActivityTypeAddFormOpen}
						handleCloseActivityTypeAddForm={handleCloseActivityTypeeAddForm}
						toggleChanged={() => {
							console.log('toggle Changed')
							setChanged(isChanged + 1)
						}}
						gameCharactersData={gameCharactersData}
					/>
				}
			</Container>
		</>
	)
}
