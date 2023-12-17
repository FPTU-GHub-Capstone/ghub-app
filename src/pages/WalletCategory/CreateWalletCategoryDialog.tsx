import { Box, Drawer } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../components/DialogHeader'
import { RestService }from '../../services/RestService'
import config from '../../config'

import WalletCategoryAddForm from './components/WalletCategoryForm'


const restSvc = RestService.getInstance()

type Props = {
	isOpenCreateWalletCategoryDialog: boolean,
	handleCloseWalletCategoryAddForm: () => void,
	toggleChanged: () => void,
};

export type CreateWalletCategoryInputType = {
	name: string,
	gameId: string,
};

export default function CreateWalletCategoryDialog({
	isOpenCreateWalletCategoryDialog,
	handleCloseWalletCategoryAddForm,
	toggleChanged,
}: Props) {
	const { gameId } = useParams()

	const form = useForm<CreateWalletCategoryInputType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			gameId: gameId,
		},
	})
	const { register, handleSubmit, formState } = form
	const { errors } = formState

	const handlePostData = async (data: CreateWalletCategoryInputType) => {
		try {
			await restSvc.post(`${config.GMS_URL}/games/${gameId}/wallet-categories`, data)
			console.log('submit data',data)
		} catch (error) {
			console.error('Error adding new wallet category:', error)
		}
	}

	const onSubmit = async (data: CreateWalletCategoryInputType) => {
		try {
			await handlePostData(data)
			toggleChanged()
			handleCloseWalletCategoryAddForm()
		} catch (error) {
			console.error('Error submitting:', error)
		}
	}
	

	return (
		<Drawer anchor='right' open={isOpenCreateWalletCategoryDialog} onClose={handleCloseWalletCategoryAddForm}>
			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader
					titleDialog='Create Wallet Category'
					titleBtn='Save'
					handleCloseDialog={handleCloseWalletCategoryAddForm}
				/>

				<WalletCategoryAddForm<CreateWalletCategoryInputType> errors={errors} register={register} />
			</Box>
		</Drawer>
	)
}
