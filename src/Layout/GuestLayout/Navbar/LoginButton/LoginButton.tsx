import React from 'react'
import { Box, Button, Typography } from '@mui/material'
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
					sx={{
						paddingY: '10px', paddingX: '45px',
						marginRight: '15px',
						marginLeft: '15px',
					}}
					onClick={handleButtonClick}
				>
					<Typography sx={{ fontSize: '17px', fontWeight: '450' }}>{text}</Typography>
				</Button>
			</Box>
		</ThemeProvider>
	)
}

export default LoginButton