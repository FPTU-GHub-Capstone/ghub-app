import { Box, Drawer } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../components/DialogHeader'
import RestService from '../../services/RestService'
import config from '../../config'

import ServerAddForm from './components/ServerAddForm'


type Props = {
	isOpenCreateServerDialog: boolean,
	handleCloseCreateServerDialog: () => void,
	toggleChanged: () => void,
};

export type CreateServerInputType = {
	name: string,
	location: string,
	artifactUrl: string,
	gameId: string,
};

export default function CreateServerDialog({
	isOpenCreateServerDialog,
	handleCloseCreateServerDialog,
	toggleChanged,
}: Props) {
	const { gameId } = useParams()

	const form = useForm<CreateServerInputType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			location: '',
			artifactUrl: '',
			gameId: gameId,
		},
	})
	const { register, handleSubmit, formState } = form
	const { errors } = formState

	const handlePostData = async (data: CreateServerInputType) => {
		try {
			await RestService.post(`${config.GMS_URL}/game-servers`, data)
		} catch (error) {
			console.error('Error adding new server:', error)
		}
	}

	const onSubmit = (data: CreateServerInputType) => {
		handlePostData(data)
		toggleChanged()
		handleCloseCreateServerDialog()
	}

	return (
		<Drawer anchor='right' open={isOpenCreateServerDialog} onClose={handleCloseCreateServerDialog}>
			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader
					titleDialog='Create Server'
					titleBtn='Save'
					handleCloseDialog={handleCloseCreateServerDialog}
				/>

				<ServerAddForm<CreateServerInputType> errors={errors} register={register} />
			</Box>
		</Drawer>
	)
}
