import { Box, Dialog } from '@mui/material'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'


import config from '../../../config'
import { Game } from '../../../common'
import RestService from '../../../services/RestService'
import DialogHeader from '../../../components/DialogHeader'
import { useDialog } from '../../../hooks/useDialog'

import { GameCreateForm } from './GameCreateForm'
import { GameCreateInputType } from './GameCreateForm/types'



type Props = {
	isOpenCreateGameDialog: boolean,
	handleCloseCreateGameDialog: () => void,
	handleSuccess: () => void,
}


export default function CreateGameDialog({ isOpenCreateGameDialog, handleCloseCreateGameDialog, handleSuccess }: Props) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isErrorSnackOpen, handleOpenErrorSnack, handleCloseErrorSnack] = useDialog()

	const form = useForm<GameCreateInputType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			logo: '',
			link: '',
		}
	})
	const { register, handleSubmit, formState, control } = form
	const { errors } = formState
	

	const onSubmit = (data: GameCreateInputType) => {
		const gameData: Game = ({id: 'a', ...data})
		postData(gameData)
	}

	const postData = async (gameData: Game) => {
		let isError = false
		try {
			await RestService.post(`${config.GMS_URL}/games`, gameData)
		} catch (error) {
			console.error('Error posting Game with: ', error)
			isError = true
		}
		if (!isError) {
			handleSuccess()
		}
	}

	return (
		<Dialog
			fullWidth={true} maxWidth={'lg'}
			open={isOpenCreateGameDialog} onClose={handleCloseCreateGameDialog}
		>
			<Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{height: '80vh'}}>
				<DialogHeader
					titleDialog='Create a Game' 
					titleBtn='Save'
					enableBtn={false}
					handleCloseDialog={handleCloseCreateGameDialog}
				/>
				
				<GameCreateForm
					register={register}
					errors={errors}
					control={control}
				/>
				<DevTool control={control} />
			</Box>
		</Dialog>
	)
}
