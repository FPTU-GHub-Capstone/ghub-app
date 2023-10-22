import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom' // Import useNavigate

import { theme } from './styles'


const PublicFormButton: React.FC<{ text?: string }> = ({ text: text = '' }) => {
	const navigate = useNavigate() // Get the navigate function

	const handleButtonClick = () => {
		// Handle button click
		navigate('/login') // Navigate to /login
	}

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex', justifyContent: 'right' }}>
				<Button
					variant="contained"
					sx={{
						paddingY: '10px',  paddingX: '45px',
						marginRight: '15px',
						marginLeft: '15px',
					}}
					onClick={handleButtonClick} // Handle the click event
				>
					<Typography sx={{ fontSize: '17px', fontWeight: '450' }}>{text}</Typography>
				</Button>
			</Box>
		</ThemeProvider>
	)
}

export default PublicFormButton
