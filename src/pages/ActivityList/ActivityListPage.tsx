/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { RestService } from '../../services/RestService'
import { Activity } from '../../common/types'
import config from '../../config'

import { ActivityListTable } from './ActivityListTable'



type ActivityResponse = {
	isError: boolean,
	message: string,
	result: Activity[],
};

const restSvc = RestService.getInstance()

export const ActivityListPage = ({ title }: { title: string }) => {
	const [activities, setActivities] = useState<Activity[]>([])
	const {gameId} = useParams()

	useEffect(() => {
		fetchActivity(gameId)
	}, [gameId])

	const fetchActivity = async (inputGameId : string) => {
		try {
			const activityResponse = await restSvc.get<ActivityResponse>(
				`${config.GMS_URL}/games/${inputGameId}/activities`)
			const activityResult = activityResponse.data.result
			setActivities(activityResult)
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
