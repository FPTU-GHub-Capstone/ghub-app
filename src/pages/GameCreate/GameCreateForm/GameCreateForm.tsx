import {
	Box,
	ThemeProvider,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import {Button as CreateButton} from '../../../components/PublicFormButton'
import InputField from '../../../components/TextFields/InputField'

import { theme } from './styles'
import { GameCreateInputType } from './types'


export const GameCreateForm = ({ onSubmit } : { onSubmit: (data: GameCreateInputType) => void }) => {
	const form = useForm<GameCreateInputType>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			logo: '',
			link: '',
		}
	})
	const { register, handleSubmit, formState, control } = form
	const { errors } = formState
	
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '80%'
			}}
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			>
				<InputField<GameCreateInputType>
					errors={errors}
					register={register}
					name='name'
					label='Name'
				/>
				<InputField<GameCreateInputType>
					errors={errors}
					register={register}
					name='link'
					label='Image of your Game'
				/>
				<InputField<GameCreateInputType>
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
