import { Box, Drawer } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../components/DialogHeader'
import { RestService }from '../../services/RestService'
import config from '../../config'
import { Character, Game } from '../../common'

import ActivityTypeAddForm from './components/ActivityTypeForm'


const restSvc = RestService.getInstance()

type Props = {
	isOpenCreateActivityTypeDialog: boolean,
	handleCloseActivityTypeAddForm: () => void,
	toggleChanged: () => void,
	gameCharactersData: Character[],
	currentGame: Game,
};

export type CreateActivityTypeInputType = {
	name: string,
	characterId: string,
	gameId: string,
};

export default function CreateActivityTypeDialog({
	isOpenCreateActivityTypeDialog,
	handleCloseActivityTypeAddForm,
	toggleChanged,
	gameCharactersData,
	currentGame,
}: Props) {
	const { gameId } = useParams()

	const form = useForm<CreateActivityTypeInputType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			characterId: '',
			gameId: gameId,
		},
	})
	const { register, handleSubmit, formState, control } = form
	const { errors } = formState

	const handlePostData = async (data: CreateActivityTypeInputType) => {
		try {
			await restSvc.post(`${config.GMS_URL}/games/${gameId}/activity-types`, data)
			console.log('submit data',data)
		} catch (error) {
			console.error('Error adding new activity type:', error)
		}
	}

	const onSubmit = async (data: CreateActivityTypeInputType) => {
		try {
			await handlePostData(data)
			toggleChanged()
			handleCloseActivityTypeAddForm()
		} catch (error) {
			console.error('Error submitting:', error)
		}
	}
	

	return (
		<Drawer anchor='right' open={isOpenCreateActivityTypeDialog} onClose={handleCloseActivityTypeAddForm}>
			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader
					titleDialog='Create Activity Type'
					titleBtn='Save'
					handleCloseDialog={handleCloseActivityTypeAddForm}
				/>

				<ActivityTypeAddForm<CreateActivityTypeInputType> 
					errors={errors} 
					register={register} 
					control={control}
					gameCharactersData={gameCharactersData}
					currentGame={currentGame}
				/>
			</Box>
		</Drawer>
	)
}
