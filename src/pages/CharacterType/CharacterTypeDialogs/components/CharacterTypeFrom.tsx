/* eslint-disable max-lines-per-function */
import React, { useState } from 'react'
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Autocomplete, Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { CharacterType } from '../../../../common'
import InputField from '../../../../components/TextFields/InputField'
import { PropertyType } from '../../type'


type FormType = {
	errors: FieldErrors<CharacterType>,
	register: UseFormRegister<CharacterType>,
	setValue?: UseFormSetValue<CharacterType>,
	getValues?: UseFormGetValues<CharacterType>,
	baseProperties?: PropertyType[],
	setBaseProperties?: React.Dispatch<React.SetStateAction<PropertyType[]>>,
}

const propertyType = ['Text', 'Number', 'Array', 'Object']

export default function CharacterTypeFrom({

	errors,
	register,
	setValue,
	getValues,
	baseProperties,
	setBaseProperties

}: FormType) {


	const handleAddProperty = () => {
		// setProperties()
	}

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
		}}
		component='form'
		padding={5}
		>
			<InputField
				errors={errors}
				register={register}
				name='name'
				label='Name'
				size='small'
			/>
			<InputField
				errors={errors}
				register={register}
				name='description'
				label='Description'
				size='small'
				multiline
				rows={4}
			/>

			<Typography variant="subtitle1" marginY={2} sx={{ color: 'text.secondary' }}>
				Base Properties
			</Typography>

			{baseProperties.map((property, index) => {
				return (
					<Stack key={index} direction="row" spacing={1}>
						<InputField
							errors={errors}
							register={register}
							name={`baseProperties[${index}].name`}
							label='Property Name'
							size='small'
						/>

						<Autocomplete
							disablePortal
							id="combo-box-demo"
							size='small'
							options={propertyType}
							sx={{ width: '30%' }}
							renderInput={(params) => <InputField {...params} 
								label="Type" 
								errors={errors}
								register={register}
								name={`baseProperties[${index}].type`}
								margin='0'
							/>}
						/>

						<InputField
							errors={errors}
							register={register}
							name={`baseProperties[${index}].value`}
							label='Value'
							size='small'
						/>

						<IconButton aria-label="delete" type="button" disabled={index == 0} >
							<Tooltip title="Remove">
								<CloseIcon />
							</Tooltip>
						</IconButton>
					</Stack>
				)
			})}

			<Button
				size='small'
				variant='text'
				onClick={handleAddProperty}
				sx={{
					color: 'secondary.main',
					'&:hover': {
						backgroundColor: 'secondary.lighter',
					},
					marginY: 3
				}}
			>
				Add Property
			</Button>
		</Box>
	)
}
