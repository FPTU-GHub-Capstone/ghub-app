import {
	Box,
	ThemeProvider,
} from '@mui/material'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import {Button as CreateButton} from '../../../../components/PublicFormButton'
import InputField from '../../../../components/TextFields/InputField'
import { NOT_EMPTY_REGEX, URL_REGEX } from '../../../../common'

import { theme } from './styles'


type Props<T extends FieldValues> = {
	errors: FieldErrors<T>, 
	register: UseFormRegister<T>,
};


export const GameCreateForm = <T extends FieldValues>({ 
	errors,
	register,
}: Props<T>) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '80%',
				margin: '40px'
			}}
			>
				<InputField<T>
					errors={errors}
					register={register}
					name='name'
					label='Name'
					requiredMsg='Name must not empty'
					pattern={NOT_EMPTY_REGEX}
				/>
				<InputField<T>
					errors={errors}
					register={register}
					name='link'
					label='Website of your game'
					pattern={{
						value: URL_REGEX,
						message: 'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
					}}
				/>
				<InputField<T>
					errors={errors}
					register={register}
					name='banner'
					label='Image of your Game'
					pattern={{
						value: URL_REGEX,
						message: 'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
					}}
				/>
				<InputField<T>
					errors={errors}
					register={register}
					name='logo'
					label='Game Logo'
					pattern={{
						value: URL_REGEX,
						message: 'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
					}}
				/>
				<CreateButton text='Create'/>
			</Box>
		</ThemeProvider>
	)

}
