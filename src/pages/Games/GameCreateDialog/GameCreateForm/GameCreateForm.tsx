/* eslint-disable max-lines-per-function */
import {
	Box,
	Button,
	Container,
	Stack,
	ThemeProvider,
	Typography,
} from '@mui/material'
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useState } from 'react'

import { Button as CreateButton } from '../../../../components/PublicFormButton'
import InputField from '../../../../components/TextFields/InputField'
import { Game, NOT_EMPTY_REGEX, URL_REGEX } from '../../../../common'
import CloudinaryUploadWidget from '../../../../components/CloudinaryUploadWidget'


import { theme } from './styles'


type Props<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
	setValue: UseFormSetValue<Game>,
};

export const GameCreateForm = <T extends FieldValues>({
	errors,
	register,
	setValue
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
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '80%',
					margin: '40px',
				}}
			>
				<InputField<T>
					errors={errors}
					register={register}
					name="name"
					label="Name"
					requiredMsg="Name must not empty"
					pattern={NOT_EMPTY_REGEX}
				/>
				<InputField<T>
					errors={errors}
					register={register}
					name="link"
					label="Website of your game"
					pattern={{
						value: URL_REGEX,
						message:
              'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
					}}
				/>
				<Typography variant='h6'>Game Banner</Typography>
				<InputField<T>
					sx={{visibility: 'hidden'}}
					type="hidden"
					errors={errors}
					register={register}
					name="banner"
					label="Image of your Game"
					pattern={{
						value: URL_REGEX,
						message:
              'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
					}}
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
				<Typography variant='h6'>Game Logo</Typography>
				<InputField<T>
					sx={{visibility: 'hidden'}}
					type="hidden"
					errors={errors}
					register={register}
					name="logo"
					label="Game Logo"
					pattern={{
						value: URL_REGEX,
						message:
              'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
					}}
				/>
				<Container>
					<CloudinaryUploadWidget onUpload={handleOnUploadLogo}>
						{({ open }) => {
							function handleOnClick(e) {
								e.preventDefault()
								open()
							}
							return <Button onClick={handleOnClick}>Upload a Game Logo</Button>
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
				<CreateButton text="Create" />
			</Box>
		</ThemeProvider>
	)
}
