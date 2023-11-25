import { Box, Drawer } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import DialogHeader from '../../components/DialogHeader'
import { Level } from '../../common'
import RestService from '../../services/RestService'
import config from '../../config'

import LevelAddForm from './components/LevelAddForm'


type Props = {
	isOpenCreateLevelDialog: boolean,
	handleCloseCreateLevelDialog: () => void,
	toggleAdded: () => void,
}

function generateRandomId(): string {
	const timestamp = new Date().toString() 
	const randomStr = Math.random().toString() 

	return `${timestamp}-${randomStr}`
}

const defaultLevel: Level = {
	id: generateRandomId(),
	name: '',
	levelUpPoint: 0,
	gameId: localStorage.getItem('gameId') || '',
	game: null,
}

export type CreateLevelInputType = {
	levels: Level[],
}

export default function CreateLevelDialog({ isOpenCreateLevelDialog, handleCloseCreateLevelDialog, toggleAdded }: Props) {
	const [levels, setLevels] = useState<Level[]>([defaultLevel])
	
	const form = useForm<CreateLevelInputType>({
		mode: 'onChange',
		defaultValues: {
			levels: [defaultLevel]
		}
	})
	const { register, handleSubmit, formState, setValue, getValues } = form
	const { errors } = formState
	
	const handlePostData = async (data: Level[]) => {
		try {
			await RestService.post(`${config.GMS_URL}/levels`, data)
		} catch (error) {
			console.error('Error adding new game Level:', error)
		}
	}

	const onSubmit = (data: CreateLevelInputType) => {
		console.log({...data.levels})
		handlePostData(data.levels)
		toggleAdded()
		handleCloseCreateLevelDialog()
	}
	
	const addLevel = () => {
		const updatedLevels = [...getValues('levels'), {...defaultLevel}]
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
			anchor='right'
			open={isOpenCreateLevelDialog} onClose={handleCloseCreateLevelDialog}
		>
			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<DialogHeader 
					titleDialog='Create Level' 
					titleBtn='Save'
					handleCloseDialog={handleCloseCreateLevelDialog}
				/>

				<LevelAddForm<CreateLevelInputType>
					levels={levels} addLevel={addLevel} removeLevel={removeLevel}
					errors={errors} register={register}
				/>
			</Box>
		</Drawer>
	)
}
