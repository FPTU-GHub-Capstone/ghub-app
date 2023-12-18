import { Box, Drawer } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../components/DialogHeader'
import { RestService }from '../../services/RestService'
import config from '../../config'
import { AssetType } from '../../common'

import AssetAddForm from './components/AssetAddForm'


const restSvc = RestService.getInstance()

type Props = {
	isOpenCreateAssetTypeDialog: boolean,
	handleCloseAssetTypeAddForm: () => void,
	toggleChanged: () => void,
	assetTypeData: AssetType[],
};

export type CreateAssetInputType = {
	name: string,
	image: string,
	description: string,
	assetTypeId: string,
	gameId: string,
};

export default function CreateAssetDialog({
	isOpenCreateAssetTypeDialog,
	handleCloseAssetTypeAddForm,
	toggleChanged,
	assetTypeData,
}: Props) {
	const { gameId } = useParams()

	const form = useForm<CreateAssetInputType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			image: '',
			description: '',
			assetTypeId: '',
			gameId: gameId,
		},
	})
	const { register, handleSubmit, formState, control, setValue } = form
	const { errors } = formState

	const handlePostData = async (data: CreateAssetInputType) => {
		try {
			await restSvc.post(`${config.GMS_URL}/games/${gameId}/assets`, data)
			console.log('submit data',data)
		} catch (error) {
			console.error('Error adding new asset:', error)
		}
	}

	const onSubmit = async (data: CreateAssetInputType) => {
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
					titleDialog='Create new Asset'
					titleBtn='Save'
					handleCloseDialog={handleCloseAssetTypeAddForm}
				/>

				<AssetAddForm<CreateAssetInputType> 
					errors={errors} 
					register={register} 
					control={control}
					assetTypeData={assetTypeData}
					setValue={setValue}
				/>
			</Box>
		</Drawer>
	)
}
