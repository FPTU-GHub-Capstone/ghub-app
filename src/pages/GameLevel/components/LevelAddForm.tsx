import { Box, Fab, IconButton } from '@mui/material'
import { Delete, Add } from '@mui/icons-material'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import InputField from '../../../components/TextFields/InputField'
import { Level } from '../../../common'


type Props<T extends FieldValues> = {
	levels: Level[],
	errors: FieldErrors<T>, 
	register: UseFormRegister<T>,
	removeLevel: (index: number) => void,
	addLevel: () => void,
};


const LevelAddForm = <T extends FieldValues>({ 
	levels,
	errors,
	register,
	removeLevel,
	addLevel,
}: Props<T>) => {
	return (
		<Box sx={{ margin: '10px' }}>
			<InputField<T>
				errors={errors}
				register={register}
				name={'levels[0].gameId'}
				label={'Game Id for Levels'}
				type="text"
				disabled
				sx={{ width: 700, marginRight: '15px' }}
			/>
			{levels.map((level, index) => (
				<Box key={level.id + index} sx={{ display: 'flex', alignItems: 'center' }}>
					<InputField<T>
						errors={errors}
						register={register}
						name={`levels[${index}].levelUpPoint`}
						label={`No.${index + 1} - Level Up Points`}
						type="number"
						requiredMsg="Cannot be empty"
						sx={{ width: 300, marginRight: '15px' }}
					/>
					<InputField<T>
						errors={errors}
						register={register}
						name={`levels[${index}].name`}
						label={`No.${index + 1} -  Description`}
						type="text"
						sx={{ width: 300, marginRight: '15px' }}
					/>
					<IconButton aria-label="delete" type="button" onClick={() => removeLevel(index)}>
						<Delete sx={{ fontSize: '35px' }} />
					</IconButton>
				</Box>
			))}
			<Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '100px'}}>
				<Fab onClick={addLevel} color="primary" aria-label="add" sx = {{
					margin: 0,
					top: 'auto',
					right: 50,
					bottom: 20,
					left: 'auto',
					position: 'fixed'}}>
					<Add sx={{fontSize: '35px'}}/>
				</Fab>
			</Box>
		</Box>
	)
}

export default LevelAddForm
