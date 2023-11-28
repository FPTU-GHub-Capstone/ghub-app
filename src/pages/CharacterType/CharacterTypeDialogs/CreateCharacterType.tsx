import { Dialog, Drawer } from '@mui/material'
import React, { useState } from 'react'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import DialogHeader from '../../../components/DialogHeader'
import { CharacterType } from '../../../common'
import { PropertyType } from '../type'

import CharacterTypeFrom from './components/CharacterTypeFrom'


type Props = {
	isOpenCreate: boolean,
	handleCloseCreate: () => void,
}

export default function CreateCharacterType({ isOpenCreate, handleCloseCreate }: Props) {
	const form = useForm<CharacterType>({
		mode: 'onChange',
		defaultValues: {
			gameId: localStorage.getItem('gameId'),
		}
	})
	const { register, handleSubmit, formState: { errors }, setValue, getValues } = form
	const [baseProperties, setBaseProperties] = useState<PropertyType[]>([{
		name: '',
		type: '',
		value: ''
	}])

	const onSubmit: SubmitHandler<CharacterType> = async (data) => {

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

			<DialogHeader
				titleDialog='Create Character Type'
				titleBtn='Save'
				handleCloseDialog={handleCloseCreate}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit as SubmitHandler<FieldValues>}
			/>

			<CharacterTypeFrom 
				errors={errors}
				register={register}
				setValue={setValue}
				getValues={getValues}
				baseProperties={baseProperties}
				setBaseProperties={setBaseProperties}
			/>
		</Drawer>
	)
}
