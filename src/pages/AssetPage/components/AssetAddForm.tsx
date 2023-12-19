/* eslint-disable max-lines-per-function */
import { Box, Card, Container, Stack, TextField, Typography } from '@mui/material'
import {
	Control,
	FieldErrors,
	FieldValues,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form'
import { useState } from 'react'
import { FileUpload } from '@mui/icons-material'

import InputField from '../../../components/TextFields/InputField'
import { AssetType, Game, URL_REGEX } from '../../../common'
import SelectField, {
	SelectFieldOptions,
} from '../../../components/TextFields/SelectField'
import CloudinaryUploadWidget from '../../../components/CloudinaryUploadWidget'
import { CreateAssetInputType } from '../CreateAssetDialog'


type Props<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
	control: Control<T, any>,
	assetTypeData: AssetType[],
	setValue: UseFormSetValue<CreateAssetInputType>,
};

const AssetAddForm = <T extends FieldValues>({
	errors,
	register,
	assetTypeData,
	control,
	setValue
}: Props<T>) => {
	const getLocalGame = localStorage.getItem('currentGame')
	const [urlLogo, setUrlLogo] = useState()
	const [error, updateError] = useState()
	const localGame: Game | null = getLocalGame ? JSON.parse(getLocalGame) : null
	function handleOnUploadImage(err, result, widget) {
		if (err) {
			updateError(err)
			widget.close({
				quiet: true,
			})
			return
		}
		const uploadedUrl = result?.info?.secure_url
		setUrlLogo(uploadedUrl)
		setValue('image', uploadedUrl)
	}
	return (
		<Box sx={{ margin: '10px' }}>
			<Stack sx={{ marginY: '20px' }}>
				<TextField
					value={localGame.name}
					label={'Game Name'}
					type="text"
					disabled
					sx={{ width: 700, marginRight: '15px' }}
				/>
				<TextField
					name={'gameId'}
					value={localGame.id}
					label={'Game Id'}
					type="text"
					disabled
					sx={{ width: 700, marginRight: '15px', marginTop: '15px' }}
				/>
			</Stack>
			<InputField<T>
				errors={errors}
				register={register}
				name={'name'}
				label={'Name'}
				type="text"
				requiredMsg="Name cannot be empty"
				sx={{ width: 700, marginRight: '15px' }}
			/>
			<br />

			<InputField<T>
				errors={errors}
				register={register}
				name={'description'}
				label={'Description'}
				type="text"
				requiredMsg="Name cannot be empty"
				sx={{ width: 700, marginRight: '15px' }}
			/>{' '}
			<br />
			<SelectField<T>
				errors={errors}
				control={control}
				name={'assetTypeId'} // Name corresponding to the field in your form
				label={'Asset Type'}
				options={assetTypeData.map(
					(type: AssetType): SelectFieldOptions => ({
						value: type.id,
						label: type.name,
					}),
				)}
				requiredMsg="Asset type selection is required"
				sx={{ width: 700, marginRight: '15px' }}
			/>
			<Typography variant="h6">Asset Image</Typography>
			<InputField<T>
				// type="hidden"
				errors={errors}
				register={register}
				name={'image'}
				label={'Image'}
				requiredMsg="Image link cannot be empty"
				pattern={{
					value: URL_REGEX,
					message:
						'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px', visibility: 'hidden' }}
			/>
			<Container>
				<CloudinaryUploadWidget onUpload={handleOnUploadImage}>
					{({ open }) => {
						function handleOnClick(e) {
							e.preventDefault()
							open()
						}
						return (
							<Box textAlign='center' sx={{ width: 100 }}>
								<Card variant='outlined' onClick={handleOnClick}
									sx={{ height: 100, width: 100, cursor: 'pointer' }}
								>
									<div>
										<FileUpload
											htmlColor="#a7a7a7"
											sx={{
												width: '100%',
												height: 'auto',
											}}
										/>
									</div>
								</Card>
								<Typography
									variant="body2"
									sx={{
										color: 'grey.600',
									}}
								>
									Upload image
								</Typography>
							</Box>
						)
					}}
				</CloudinaryUploadWidget>

				{error && <Typography>{error}</Typography>}

				{urlLogo && (
					<>
						<Stack maxWidth={'20rem'}>
							<img src={urlLogo} alt="Uploaded resource" />
						</Stack>
					</>
				)}
			</Container>
			<br />
		</Box>
	)
}

export default AssetAddForm
