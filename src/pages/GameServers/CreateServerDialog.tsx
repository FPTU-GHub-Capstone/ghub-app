import { Box, Drawer } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../components/DialogHeader'
import { GameServer } from '../../common/types'
import RestService from '../../services/RestService'
import config from '../../config'

import ServerAddForm from './components/ServerAddForm'


type Props = {
	isOpenCreateServerDialog: boolean,
	handleCloseCreateServerDialog: () => void,
	toggleChanged: () => void,
};

function generateRandomId(): string {
	const timestamp = new Date().toString()
	const randomStr = Math.random().toString()

	return `${timestamp}-${randomStr}`
}

const defaultServer: GameServer = {
	name: '',
	location: '',
	artifactUrl: '',
	gameId: '',
	id: generateRandomId(),
	createdAt: '',
	modifiedAt: '',
	deletedAt: ''
}

export type CreateServerInputType = {
	server: GameServer,
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
			server: { ...defaultServer, gameId: gameId },
		},
	})
	const { register, handleSubmit, formState } = form
	const { errors } = formState

	const handlePostData = async (data: GameServer) => {
		try {
			await RestService.post(`${config.GMS_URL}/game-servers`, data)
		} catch (error) {
			console.error('Error adding new server:', error)
		}
	}

	const onSubmit = (data: CreateServerInputType) => {
		handlePostData(data.server)
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
