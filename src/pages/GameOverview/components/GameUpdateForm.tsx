import { Box } from '@mui/material'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import InputField from '../../../components/TextFields/InputField'
import { URL_REGEX } from '../../../common'


type Props<T extends FieldValues> = {
	errors: FieldErrors<T>, 
	register: UseFormRegister<T>,
};

const GameUpdateForm = <T extends FieldValues>({ errors, register }: Props<T>) => {
	return (
		<Box sx={{ margin: '10px' }}>
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
				name={'logo'}
				label={'Game logo URL'}
				type="text"
				pattern={{
					value: URL_REGEX,
					message: 'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px' }}
			/> <br />
			<InputField<T>
				errors={errors}
				register={register}
				name={'link'}
				label={'Website link'}
				type="text"
				pattern={{
					value: URL_REGEX,
					message: 'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px' }}
			/> <br />
			<InputField<T>
				errors={errors}
				register={register}
				name={'banner'}
				label={'Banner image link'}
				type="text"
				pattern={{
					value: URL_REGEX,
					message: 'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px' }}
			/> <br />
		</Box>
	)
}

export default GameUpdateForm
