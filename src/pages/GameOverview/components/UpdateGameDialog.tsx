import { Box, Drawer } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../../components/DialogHeader'
import { RestService }from '../../../services/RestService'
import config from '../../../config'
import { Game } from '../../../common'

import GameUpdateForm from './GameUpdateForm'


type Props = {
	currentGame: Game,
	isUpdateGameDialogOpen: boolean,
	handleCloseUpdateGameDialog: () => void,
	toggleChanged: () => void,
};

type GameUpdateInputType = {
	name: string,
	logo: string,
	link: string,
	banner: string,
	gameId: string,
};

const restSvc = RestService.getInstance()

export default function UpdateGameDialog({
	currentGame,
	isUpdateGameDialogOpen,
	handleCloseUpdateGameDialog,
	toggleChanged,
}: Props) {
	const { gameId } = useParams()

	const form = useForm<GameUpdateInputType>({
		mode: 'onChange',
		defaultValues: {
			name: currentGame.name,
			logo: currentGame.logo,
			link: currentGame.link,
			banner: currentGame.link, //change to banner later, when API is done have banner
			gameId: gameId,
		},
	})
	const { register, handleSubmit, formState } = form
	const { errors } = formState

	const handlePutData = async (data: GameUpdateInputType) => {
		try {
			await restSvc.put(`${config.GMS_URL}/games/${gameId}`, data)
			console.log('submit data',data)
		} catch (error) {
			console.error('Error adding new server:', error)
		}
	}

	const onSubmit = async (data: GameUpdateInputType) => {
		try {
			await handlePutData(data)
			toggleChanged()
			handleCloseUpdateGameDialog()
		} catch (error) {
			console.error('Error submitting:', error)
		}
	}
	

	return (
		<Drawer anchor='right' open={isUpdateGameDialogOpen} onClose={handleCloseUpdateGameDialog}>
			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader
					titleDialog='Update Game '
					titleBtn='Save'
					handleCloseDialog={handleCloseUpdateGameDialog}
				/>

				<GameUpdateForm<GameUpdateInputType> errors={errors} register={register}/>
			</Box>
		</Drawer>
	)
}
