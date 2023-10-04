import React from 'react'
import { Button, Typography } from '@mui/material'

import FacebookLogo from '../assets/FacebookLogo'


const FacebookLoginButton: React.FC = () => {
	return (
		<Button variant='outlined' 
			sx={{  
				width: '48%', height: '40px', paddingY: '10px',
				borderRadius: '40px',  backgroundColor: '#fff',
			}} 
		>	
			<div style={{
				display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '90%'
			}}>
				<FacebookLogo />
				<Typography sx={{
					fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto', 
					color: '#333333'
				}}>
					Sign in with Facebook
				</Typography>			
			</div>
		</Button>
	)
}

export default FacebookLoginButton
