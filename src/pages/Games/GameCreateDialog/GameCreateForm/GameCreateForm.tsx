import {
	Box,
	ThemeProvider,
} from '@mui/material'
import { Control, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import {Button as CreateButton} from '../../../../components/PublicFormButton'
import InputField from '../../../../components/TextFields/InputField'

import { theme } from './styles'


type Props<T extends FieldValues> = {
	errors: FieldErrors<T>, 
	register: UseFormRegister<T>,
	control: Control<T, any>,
};


export const GameCreateForm = <T extends FieldValues>({ 
	errors,
	register,
	control
}: Props<T>) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '80%',
				margin: '20px'
			}}
			>
				<InputField<T>
					errors={errors}
					register={register}
					name='name'
					label='Name'
				/>
				<InputField<T>
					errors={errors}
					register={register}
					name='link'
					label='Image of your Game'
				/>
				<InputField<T>
					errors={errors}
					register={register}
					name='logo'
					label='Game Logo'
				/>
				<CreateButton text='Create'/>
			</Box>
			<DevTool control={control} />
		</ThemeProvider>
	)

}
