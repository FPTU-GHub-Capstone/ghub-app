import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { theme } from './styles'


const PublicFormButton: React.FC<{ text?: string }> = ({ text: text = ''}) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex', justifyContent: 'right' }}>
				<Button variant='contained' 
					sx={{ 
						paddingY: '10px', paddingX: '45px', 
						marginRight: '15px', marginTop: '25px', marginBottom: '25px' }} 
					type='submit'
				>
					<Typography sx={{fontSize: '17px', fontWeight: '450'}}> {text} </Typography>
				</Button>
			</Box>
		</ThemeProvider>
	)
}

export default PublicFormButton
