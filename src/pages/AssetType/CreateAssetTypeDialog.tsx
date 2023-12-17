import { Box, Drawer } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../components/DialogHeader'
import { RestService }from '../../services/RestService'
import config from '../../config'

import AssetTypeAddForm from './components/AssetTypeForm'


const restSvc = RestService.getInstance()

type Props = {
	isOpenCreateAssetTypeDialog: boolean,
	handleCloseAssetTypeAddForm: () => void,
	toggleChanged: () => void,
};

export type CreateAssetTypeInputType = {
	name: string,
	gameId: string,
};

export default function CreateAssetTypeDialog({
	isOpenCreateAssetTypeDialog,
	handleCloseAssetTypeAddForm,
	toggleChanged,
}: Props) {
	const { gameId } = useParams()

	const form = useForm<CreateAssetTypeInputType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			gameId: gameId,
		},
	})
	const { register, handleSubmit, formState } = form
	const { errors } = formState

	const handlePostData = async (data: CreateAssetTypeInputType) => {
		try {
			await restSvc.post(`${config.GMS_URL}/games/${gameId}/asset-types`, data)
			console.log('submit data',data)
		} catch (error) {
			console.error('Error adding new assetType:', error)
		}
	}

	const onSubmit = async (data: CreateAssetTypeInputType) => {
		try {
			await handlePostData(data)
			toggleChanged()
			handleCloseAssetTypeAddForm()
		} catch (error) {
			console.error('Error submitting:', error)
		}
	}
	

	return (
		<Drawer anchor='right' open={isOpenCreateAssetTypeDialog} onClose={handleCloseAssetTypeAddForm}>
			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader
					titleDialog='Create Asset Type'
					titleBtn='Save'
					handleCloseDialog={handleCloseAssetTypeAddForm}
				/>

				<AssetTypeAddForm<CreateAssetTypeInputType> errors={errors} register={register} />
			</Box>
		</Drawer>
	)
}
