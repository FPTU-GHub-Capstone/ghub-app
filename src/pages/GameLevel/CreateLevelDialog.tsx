/* eslint-disable max-lines-per-function */
import { Box, Drawer } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DialogHeader from '../../components/DialogHeader'
import { Level } from '../../common'
import { RestService } from '../../services/RestService'
import config from '../../config'

import LevelAddForm from './components/LevelAddForm'


type Props = {
	isOpenCreateLevelDialog: boolean,
	handleCloseCreateLevelDialog: () => void,
	toggleChanged: () => void,
	currentLevelCap: number,
};

function generateRandomId(): string {
	const timestamp = new Date().toString()
	const randomStr = Math.random().toString()

	return `${timestamp}-${randomStr}`
}

const defaultLevel: Level = {
	id: generateRandomId(),
	levelNo: 0,
	description: '',
	levelUpPoint: 0,
	gameId: '',
	game: null,
}

export type CreateLevelInputType = {
	levels: Level[],
};

export default function CreateLevelDialog({
	isOpenCreateLevelDialog,
	handleCloseCreateLevelDialog,
	toggleChanged,
	currentLevelCap,
}: Props) {
	const { gameId } = useParams()
	const [levels, setLevels] = useState<Level[]>([
		{ ...defaultLevel, gameId: gameId },
	])

	const form = useForm<CreateLevelInputType>({
		mode: 'onChange',
		defaultValues: {
			levels: [{ ...defaultLevel, gameId: gameId }],
		},
	})
	const { register, handleSubmit, formState, setValue, getValues } = form
	const { errors } = formState

	const restSvc = RestService.getInstance()
	const handlePostData = async (data: Level[]) => {
		try {
			await restSvc.post(`${config.GMS_URL}/games/${gameId}/levels`, data)
		} catch (error) {
			console.error('Error adding new game Level:', error)
		}
	}

	const onSubmit = async (data: CreateLevelInputType) => {
		try {
			await handlePostData(data.levels)
			toggleChanged()
			handleCloseCreateLevelDialog()
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const addLevel = () => {
		const updatedLevels = [
			...getValues('levels'),
			{ ...defaultLevel, gameId: gameId },
		]
		setLevels(updatedLevels)
		setValue('levels', updatedLevels)
	}

	const removeLevel = (index: number) => {
		const updatedLevels = getValues('levels')
		updatedLevels.splice(index, 1)
		setLevels(updatedLevels)
		setValue('levels', updatedLevels)
		if (updatedLevels.length == 0) handleCloseCreateLevelDialog()
	}

	useEffect(() => {
		setValue('levels', levels)
	}, [levels, setValue])

	return (
		<Drawer
			anchor="right"
			open={isOpenCreateLevelDialog}
			onClose={handleCloseCreateLevelDialog}
		>
			<Box component="form" onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader
					titleDialog="Create Level"
					titleBtn="Save"
					handleCloseDialog={handleCloseCreateLevelDialog}
				/>

				<LevelAddForm<CreateLevelInputType>
					levels={levels}
					addLevel={addLevel}
					removeLevel={removeLevel}
					errors={errors}
					register={register}
					currentLevelCap={currentLevelCap}
				/>
			</Box>
		</Drawer>
	)
}
