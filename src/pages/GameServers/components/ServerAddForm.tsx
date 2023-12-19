import { Box, Stack, TextField } from '@mui/material'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import InputField from '../../../components/TextFields/InputField'
import { Game, URL_REGEX } from '../../../common'


type Props<T extends FieldValues> = {
	errors: FieldErrors<T>, 
	register: UseFormRegister<T>,
	currentGame: Game,
};

const ServerAddForm = <T extends FieldValues>({ errors, register, currentGame }: Props<T>) => {
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
			<InputField<T>
				errors={errors}
				register={register}
				name={'location'}
				label={'Location'}
				type="text"
				requiredMsg="Location cannot be empty"
				sx={{ width: 700, marginRight: '15px' }}
			/> <br />
			<InputField<T>
				errors={errors}
				register={register}
				name={'artifactUrl'}
				label={'Artifact URL'}
				type="text"
				requiredMsg="Artifact URL cannot be empty"
				pattern={{
					value: URL_REGEX,
					message: 'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px' }}
			/> <br />
		</Box>
	)
}

export default ServerAddForm
