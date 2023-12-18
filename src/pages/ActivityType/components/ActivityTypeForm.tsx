import { Box, Stack, TextField } from '@mui/material'
import { Control, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import InputField from '../../../components/TextFields/InputField'
import { Character, Game } from '../../../common'
import SelectField, { SelectFieldOptions } from '../../../components/TextFields/SelectField'


type Props<T extends FieldValues> = {
	errors: FieldErrors<T>, 
	register: UseFormRegister<T>,
	control: Control<T, any>,
	gameCharactersData: Character[],
	currentGame: Game,
};

const ActivityTypeAddForm = <T extends FieldValues>({ errors, register, control, gameCharactersData, currentGame}: Props<T>) => {
	return (
		<Box sx={{ margin: '10px' }}>
			<Stack sx={{ marginY: '20px' }}>
				<TextField
					name={'Non-func game name'} value={currentGame? currentGame.name: ''}
					label={'Game Name'}
					type="text" disabled
					sx={{ width: 700, marginRight: '15px' }}
				/>
				<TextField
					name={'Non-func game ID'} value={currentGame? currentGame.id: ''}
					label={'Game Id'}
					type="text" disabled
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
			/> <br />
			
			<SelectField<T>
				errors={errors}
				control={control}
				name={'characterId'} // Name corresponding to the field in your form
				label={'Choose the character'}
				options={gameCharactersData.map((type: Character): SelectFieldOptions => ({
					value: type.id,
					label: type.currentProperty,
				}))}
				requiredMsg="Character selection is required"
				sx={{ width: 700, marginRight: '15px' }}
			/>
		</Box>
	)
}

export default ActivityTypeAddForm
