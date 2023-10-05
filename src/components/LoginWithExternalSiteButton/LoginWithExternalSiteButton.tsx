import React from 'react'
import { Button, Typography } from '@mui/material'


const LoginWithExternalSiteButton: React.FC<{ onClick?: () => void, text: string, children: React.ReactNode }> = ({
	onClick = () => console.log('Default click action'),
	text = 'Default button',
	children,
}) => {
	return (
		<Button
			variant="outlined"
			sx={{
				width: '48%', height: '40px', paddingY: '10px',
				borderRadius: '40px',  backgroundColor: '#fff',
			}}
			onClick={onClick}
		>
			<div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '90%', }} >
				{children}
				<Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto', color: '#333333', }} >
					{text}
				</Typography>
			</div>
		</Button>
	)
}

export default LoginWithExternalSiteButton
