import { Box, Drawer } from '@mui/material'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../../components/DialogHeader'
import { CharacterType, HttpStatusCode } from '../../../common'
import { PropertyType } from '../type'
import { convertArrayToObject, createCharacterType } from '../../../services/CharacterTypeService'
import { characterTypeFetch } from '../../../redux/slices/characterTypeSlide'
import { useAppDispatch } from '../../../redux/hook'
import { showSuccess } from '../../../utils/toast'

import CharacterTypeFrom from './components/CharacterTypeFrom'


type Props = {
	isOpenCreate: boolean,
	handleCloseCreate: () => void,
}

const defaultProperty: PropertyType = {
	name: '',
	type: 'Text',
	value: ''
}

export default function CreateCharacterType({ isOpenCreate, handleCloseCreate }: Props) {
	const form = useForm<CharacterType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: '',
		}
	})
	
	const { register, handleSubmit, formState: { errors }, setValue, getValues } = form
	const [properties, setProperties] = useState<PropertyType[]>([ {...defaultProperty} ])
	const { gameId } = useParams()
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<CharacterType> = async (data) => {
		// setValue('baseProperties', convertArrayToObject(properties))
		data.baseProperties = convertArrayToObject(properties)

		const response = await createCharacterType(gameId, data)
		console.log(JSON.stringify(response.data))
		if(response.status == HttpStatusCode.CREATED) {
			showSuccess('Character Type has been created successfully!')
			dispatch(characterTypeFetch(gameId))
			handleCloseCreate()
			setProperties([{...defaultProperty}])
		}
		console.log(data)
		console.log(properties)
		console.log(convertArrayToObject(properties))
	}

	

	return (
		<Drawer
			anchor='right'
			PaperProps={{
				style: {
					width: '50vw'
				},
			}}
			open={isOpenCreate}
			onClose={handleCloseCreate}
		>
			<Box component="form" onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader
					titleDialog='Create Character Type'
					titleBtn='Save'
					handleCloseDialog={handleCloseCreate}
				/>

				<CharacterTypeFrom 
					errors={errors}
					register={register}
					setValue={setValue}
					getValues={getValues}
					properties={properties}
					setProperties={setProperties}
					defaultProperty={defaultProperty}
				/>
			</Box>

			
		</Drawer>
	)
}
