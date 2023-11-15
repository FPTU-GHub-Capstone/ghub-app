/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import RestService from '../../services/RestService'
import { Activity, ActivityType } from '../../common/types'

import { ActivityListTable } from './ActivityListTable'



type ActivityResponse = {
	isError: boolean,
	message: string,
	result: Activity[],
};

type ActivityTypeResponse = {
	isError: boolean,
	message: string,
	result: ActivityType[],
};



export const ActivityListPage = ({ title }: { title: string }) => {
	const [activities, setActivities] = useState<Activity[]>([])
	const [originalActivities, setOriginalActivities] = useState<Activity[]>([])
	const [gameId, setGameId] = useState<string | null>(null)
	const location = useLocation()

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		setGameId(extractedGameId)
		fetchActivity(extractedGameId)
	}, [location.pathname])

	const fetchActivity = async (inputGameId : string) => {
		try {
			const activityTypeResponse = await RestService.get<ActivityTypeResponse>('http://localhost:8080/v1/gms/activity-types')
			const activityResponse = await RestService.get<ActivityResponse>('http://localhost:8080/v1/gms/activities')
			
			const activityResult = activityResponse.data.result
			const activityTypeResult = activityTypeResponse.data.result

			const filteredActivities = activityResult.filter((activity) => {
				return (
					activity.activityTypeId &&
					activityTypeResult.some((activityType) => activityType.gameId === inputGameId && activityType.id === activity.activityTypeId)
				)
			})

			setActivities(filteredActivities)
			setOriginalActivities(filteredActivities)
		} catch (error) {
			console.error('Error fetching activity type data:', error)
		}
	}

	const handleChangeActivities = ( newActivities: Activity[] ) => { 
		setActivities(newActivities) 
	}

	return (
		<>
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				</Stack>

				<ActivityListTable activities={activities} setActivities={handleChangeActivities} />
			</Container>
		</>
	)
}
