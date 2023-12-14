import { Box, Dialog } from '@mui/material'
import { useForm } from 'react-hook-form'


import { Game, HttpStatusCode } from '../../../common'
import DialogHeader from '../../../components/DialogHeader'
import { useDialog } from '../../../hooks/useDialog'
import { createGame } from '../../../services/GameService'
import { useAppDispatch } from '../../../redux/hook'
import { exchangeToken } from '../../../services/AuthService'
import { gamesFetch } from '../../../redux/slices/gameSlice'

import { GameCreateForm } from './GameCreateForm'



type Props = {
	isOpenCreateGameDialog: boolean,
	handleCloseCreateGameDialog: () => void,
	handleSuccess: () => void,
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CreateGameDialog({ isOpenCreateGameDialog, handleCloseCreateGameDialog, handleSuccess }: Props) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isErrorSnackOpen, handleOpenErrorSnack, handleCloseErrorSnack] = useDialog()

	const form = useForm<Game>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			logo: '',
			link: '',
			banner: ''
		}
	})
	const { register, handleSubmit, formState } = form
	const { errors } = formState
	const dispatch = useAppDispatch()

	const onSubmit = async (data: Game) => {
		const gameData: Game = ({...data})
		const response = await createGame(gameData)

		if(response.status == HttpStatusCode.CREATED) {
			await exchangeToken()
			dispatch(gamesFetch())
			handleCloseCreateGameDialog()
		}
	}

	return (
		<Dialog
			fullWidth={true} maxWidth={'sm'}
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
				/>
			</Box>
		</Dialog>
	)
}
