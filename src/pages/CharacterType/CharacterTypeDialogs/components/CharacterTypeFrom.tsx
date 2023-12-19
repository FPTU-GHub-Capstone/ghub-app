/* eslint-disable max-lines-per-function */
import React from 'react'
import {
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
	useForm,
} from 'react-hook-form'
import {
	Autocomplete,
	Box,
	Button,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { CharacterType } from '../../../../common'
import InputField from '../../../../components/TextFields/InputField'
import { PropertyType } from '../../type'


type FormType = {
	errors: FieldErrors<CharacterType>,
	register: UseFormRegister<CharacterType>,
	setValue?: UseFormSetValue<CharacterType>,
	getValues?: UseFormGetValues<CharacterType>,
	properties: PropertyType[],
	setProperties: React.Dispatch<React.SetStateAction<PropertyType[]>>,
	defaultProperty?: PropertyType,
};

const propertyType = ['Text', 'Number', 'Array', 'Object']

const RenderBaseProperty = ({
	properties,
	setProperties,
	defaultProperty,
}: {
	properties: PropertyType[],
	setProperties: React.Dispatch<React.SetStateAction<PropertyType[]>>,
	defaultProperty: PropertyType,
}) => {
	const property = useForm<{ properties: PropertyType[] }>({
		mode: 'onChange',
	})
	const {
		register,
		formState: { errors },
		setValue,
		getValues,
	} = property

	const addProperty = () => {
		const updateProperty = [...getValues('properties'), { ...defaultProperty }]

		setProperties(updateProperty)
		setValue('properties', updateProperty)
	}

	const removeProperty = (index: number) => {
		const updateProperty = getValues('properties')
		updateProperty.splice(index, 1)

		setProperties(updateProperty)
		setValue('properties', updateProperty)
	}

	return (
		<Box>
			<Typography
				variant="subtitle1"
				marginY={2}
				sx={{ color: 'text.secondary' }}
			>
        Base Properties
			</Typography>

			{properties.map((item, index) => {
				return (
					<Stack key={index} direction="row" spacing={1} marginBottom={1}>
						<InputField
							errors={errors}
							register={register}
							name={`properties[${index}].name`}
							label="Property Name"
							size="small"
							onChange={() => setProperties([...getValues('properties')])}
						/>

						<Autocomplete
							disablePortal
							id="combo-box-demo"
							size="small"
							options={propertyType}
							sx={{ width: '30%' }}
							onChange={() => setProperties([...getValues('properties')])}
							renderInput={(params) => (
								<InputField
									{...params}
									label="Type"
									errors={errors}
									register={register}
									name={`properties[${index}].type`}
									margin="0"
								/>
							)}
						/>

						<InputField
							errors={errors}
							register={register}
							name={`properties[${index}].value`}
							label="Value"
							size="small"
							onChange={() => setProperties([...getValues('properties')])}
						/>
						{(index === properties.length - 1 ) && (index !== 0)? (
							<IconButton
								aria-label="delete"
								type="button"
								onClick={() => removeProperty(index)}
							>
								<Tooltip title="Remove">
									<CloseIcon />
								</Tooltip>
							</IconButton>
						) : (
							<Stack width={'40px'} height={'40px'} p={'8px'} />
						)}
					</Stack>
				)
			})}

			<Button
				size="small"
				variant="text"
				onClick={addProperty}
				fullWidth
				sx={{
					color: 'secondary.main',
					'&:hover': {
						backgroundColor: 'secondary.lighter',
					},
					marginY: 3,
				}}
			>
        New Property
			</Button>
		</Box>
	)
}

export default function CharacterTypeFrom({
	errors,
	register,
	properties,
	setProperties,
	defaultProperty,
}: FormType) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
			component="form"
			padding={5}
		>
			<InputField
				errors={errors}
				register={register}
				name="name"
				label="Name"
				size="small"
			/>
			<InputField
				errors={errors}
				register={register}
				name="description"
				label="Description"
				size="small"
				multiline
				rows={4}
			/>

			<RenderBaseProperty
				properties={properties}
				setProperties={setProperties}
				defaultProperty={defaultProperty}
			/>
		</Box>
	)
}
