import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { theme } from './styles'


const LoginWithExternalSiteButton: React.FC<{ onClick?: () => void, text: string, children: React.ReactNode }> = ({
	onClick = () => console.log('Default click action'),
	text = 'Default button',
	children,
}) => {
	return ( 
		<ThemeProvider theme={theme}>
			<Button
				variant="outlined"
				fullWidth
				sx={{
					width: '100%', height: '50px', paddingY: '10px',
					borderRadius: '40px',  backgroundColor: '#fff',
				}}
				onClick={onClick}
			>
				<div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '90%', }} >
					<Stack direction="row" spacing={2}>
						{children}
						<Typography sx={{ fontSize: '18px', fontWeight: '500', fontFamily: 'Roboto', color: 'grey.800', }} >
							{text}
						</Typography>
					</Stack>
					
				</div>
			</Button>
		</ThemeProvider>
	)
}

export default LoginWithExternalSiteButton
