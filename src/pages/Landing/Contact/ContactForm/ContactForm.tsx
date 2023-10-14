import React from 'react'
import { styled } from '@mui/material/styles'
import {
	Box,
	Typography,
	ThemeProvider,
	Container,
	TextField,
	InputBase,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { Button as ContactFormBtn } from '../../../../components/PublicFormButton'

import { theme } from './styles'

import { ContactFormType } from '.'


// eslint-disable-next-line @typescript-eslint/no-shadow
const TextFieldCustom = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(3.5)
	},
	'& .MuiInputBase-input': {
		position: 'relative',  backgroundColor: '#ffffff12',
		border: '1px solid', borderColor: '#E0E3E7', borderRadius: 4, 
		fontSize: 18,  color: '#B8ADA7', width: 'auto', padding: '12px 15px',
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow'
		]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		'&:focus': {
			borderColor: '#CECECE'
		}
	}
}))

const commonTextFieldStyle = {
	backgroundColor: '#4f4f4fA3',
	color: 'white',
	input: { color: 'white' }, borderRadius: '10px'
}

const ContactForm: React.FC = () => {
	const form = useForm<ContactFormType>({
		mode: 'onChange',
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			message: '',
		},
	})
	const { register, handleSubmit, formState, control } = form
	const { errors } = formState

	const onSubmit = (data: ContactFormType) => {
		console.log({ ...data })
	}

	return (
		<ThemeProvider theme={theme}>
			<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '70%', }}
					component="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: '15px'}} >
						<TextField label="First name" variant="filled" autoComplete="off"
							sx={{ ...commonTextFieldStyle, width: '48%' }}
						></TextField>
						<TextField label="Last name" variant="filled" autoComplete="off"
							sx={{ ...commonTextFieldStyle, width: '48%' }}
						></TextField>
					</Box>
					<TextField label="Email" variant="filled" autoComplete="off"
						sx={{ ...commonTextFieldStyle, marginBottom: '15px' }} fullWidth
					></TextField>
					<TextField label="Message" variant="filled" autoComplete="off"
						sx={{ ...commonTextFieldStyle, marginBottom: '15px' }}
						multiline={Boolean(true)} minRows={5} maxRows={7}
					></TextField>
					<ContactFormBtn text="Get in touch" />

				</Box>
			</Container>

			<DevTool control={control} />
		</ThemeProvider>
	)
}

export default ContactForm
