import React from 'react'
import { Box, Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom' 

import { theme } from './styles'


const LoginButton: React.FC<{ text?: string }> = ({ text: text = '' }) => {
	const navigate = useNavigate() 

	const handleButtonClick = () => {
		navigate('/login') 
	}

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex', justifyContent: 'right' }}>
				<Button
					variant="contained"
					size='small'
					sx={{
						paddingY: '10px', paddingX: '30px',
						marginRight: '15px',
						marginLeft: '15px',
					}}
					onClick={handleButtonClick}
				>
					{text}
				</Button>
			</Box>
		</ThemeProvider>
	)
}

export default LoginButton
