/* eslint-disable max-lines-per-function */
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import {
	FieldErrors,
	FieldValues,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react'
import { useState } from 'react'

import InputField from '../../../components/TextFields/InputField'
import { URL_REGEX } from '../../../common'
import CloudinaryUploadWidget from '../../../components/CloudinaryUploadWidget'


type GameUpdateInputType = {
	name: string,
	logo: string,
	link: string,
	banner: string,
	gameId: string,
};

type Props<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
	setValue: UseFormSetValue<GameUpdateInputType>,
};

const GameUpdateForm = <T extends FieldValues>({
	errors,
	register,
	setValue,
}: Props<T>) => {
	const [urlBanner, setUrlBanner] = useState()
	const [urlLogo, setUrlLogo] = useState()
	const [error, updateError] = useState()

	function handleOnUploadBanner(err, result, widget) {
		if (err) {
			updateError(err)
			widget.close({
				quiet: true,
			})
			return
		}
		const uploadedUrl = result?.info?.secure_url
		setUrlBanner(uploadedUrl)
		setValue('banner', uploadedUrl)
	}
	function handleOnUploadLogo(err, result, widget) {
		if (err) {
			updateError(err)
			widget.close({
				quiet: true,
			})
			return
		}
		const uploadedUrl = result?.info?.secure_url
		setUrlLogo(uploadedUrl)
		setValue('logo', uploadedUrl)
	}

	return (
		<Box sx={{ margin: '10px' }}>
			<InputField<T>
				errors={errors}
				register={register}
				name={'name'}
				label={'Name'}
				type="text"
				requiredMsg="Name cannot be empty"
				sx={{ width: 700, marginRight: '15px' }}
			/>{' '}
			<br />{' '}
			<InputField<T>
				errors={errors}
				register={register}
				name={'link'}
				label={'Website link'}
				type="text"
				pattern={{
					value: URL_REGEX,
					message:
            'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px' }}
			/>{' '}
			<br />
			<Typography variant="h6">Game Logo</Typography>
			<InputField<T>
				type="hidden"
				errors={errors}
				register={register}
				name={'logo'}
				label={'Game logo URL'}
				pattern={{
					value: URL_REGEX,
					message:
            'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px',  visibility: 'hidden'  }}
			/>
			<Container>
				<CloudinaryUploadWidget onUpload={handleOnUploadLogo}>
					{({ open }) => {
						function handleOnClick(e) {
							e.preventDefault()
							open()
						}
						return <Button onClick={handleOnClick}>Upload a Game Banner</Button>
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
				<br />
			</Container>
			<br />
			<Typography variant="h6">Game Banner</Typography>
			<InputField<T>
				type="hidden"
				errors={errors}
				register={register}
				name={'banner'}
				label={'Banner image link'}
				pattern={{
					value: URL_REGEX,
					message:
            'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px',  visibility: 'hidden'  }}
			/>
			<Container>
				<CloudinaryUploadWidget onUpload={handleOnUploadBanner}>
					{({ open }) => {
						function handleOnClick(e) {
							e.preventDefault()
							open()
						}
						return <Button onClick={handleOnClick}>Upload a Game Banner</Button>
					}}
				</CloudinaryUploadWidget>

				{error && <Typography>{error}</Typography>}

				{urlBanner && (
					<>
						<Stack maxWidth={'20rem'}>
							<img src={urlBanner} alt="Uploaded resource" />
						</Stack>
					</>
				)}
			</Container>
			<br />
		</Box>
	)
}

export default GameUpdateForm
