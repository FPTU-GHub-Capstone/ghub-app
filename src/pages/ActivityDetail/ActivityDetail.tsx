import { useState, useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useLocation } from 'react-router'

import RestService from '../../services/RestService'
import { Activity, ActivityType } from '../../common'
import { Game } from '../Games/types'


type ActivityResponse = {
	isError: boolean,
	message: string,
	result: Activity,
};

type ActivityTypeResponse = {
	isError: boolean,
	message: string,
	result: ActivityType,
};

type GameResponse = {
	isError: boolean,
	message: string,
	result: Game,
}

export const ActivityDetail = () => {
	const [activity, setActivity] = useState<Activity>()
	const [activityType, setActivityType] = useState<ActivityType>()
	const [game, setGame] = useState<Game>()

	const location = useLocation()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [,,gameId,,activityId] = location.pathname.split('/')
				const activityResponse = await RestService.get<ActivityResponse>(`http://localhost:8080/v1/gms/activities/${activityId}`)
				const gameResponse = await RestService.get<GameResponse>(`http://localhost:8080/v1/gms/games/${gameId}`)
				const activityTypeId = activityResponse.data.result.activityTypeId
				const activityTypeResponse = await RestService.get<ActivityTypeResponse>(`http://localhost:8080/v1/gms/activity-types/${activityTypeId}`)

				setActivity(activityResponse.data.result)
				setActivityType(activityTypeResponse.data.result)
				setGame(gameResponse.data.result)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchData()
	}, [location.pathname])


	return (
		<Container>
			{(activity && activityType && game) &&(
				<>
					<Box>
						<Typography variant="h2">Game: {game.name}</Typography>
						<img src={game.link} alt={'Game banner'} />
					</Box>
					<Box>
						<Typography variant="h2">Activity name: {activity.name}</Typography>
						<Typography variant="h3">Activity Type: {activityType.name}</Typography>
					</Box>
				</>
			)}
		</Container>
	)
}

