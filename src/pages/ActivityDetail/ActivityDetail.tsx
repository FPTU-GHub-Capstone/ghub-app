import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router'

import { RestService } from '../../services/RestService'
import { Activity, ActivityType, Game } from '../../common'
import config from '../../config'


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

const restSvc = RestService.getInstance()

export const ActivityDetail = () => {
	const [activity, setActivity] = useState<Activity>()
	const [activityType, setActivityType] = useState<ActivityType>()
	const [game, setGame] = useState<Game>()

	const location = useLocation()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [,,gameId,,activityId] = location.pathname.split('/')
				const activityResponse = await restSvc.get<ActivityResponse>(`${config.GMS_URL}/games/${gameId}/activities/${activityId}`)
				const gameResponse = await restSvc.get<GameResponse>(`${config.GMS_URL}/games/${gameId}`)
				const activityTypeId = activityResponse.data.result.activityTypeId
				const activityTypeResponse = await restSvc.get<ActivityTypeResponse>(`${config.GMS_URL}/games/${gameId}/activity-types/${activityTypeId}`)

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
		<>
			{(activity && activityType && game) &&(
				<Box>
					<Box
						component="img"
						sx={{ width: '100%', height: '250px', objectFit: 'cover' }}
						alt="The house from the offer."
						src={game.banner} 
					/>
					<Box>
						<Typography variant="h4">Game: {game.name}</Typography>
					</Box>
					<Box>
						<Typography variant="h4">Activity name: {activity.name}</Typography>
						<Typography variant="h4">Activity Type: {activityType.name}</Typography>
					</Box>
				</Box>
			)}
		</>
	)
}

