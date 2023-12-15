import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'

import Logo from '../../components/Logo/Logo'


export default function PaymentSuccess() {
	const navigate = useNavigate()
	

	return (
		<Stack height="100vh" justifyContent={'center'} alignItems={'center'} sx={{backgroundImage:'url(/assets/images/covers/cover_4.jpg)', backgroundSize:'contain'}}>
			<Logo/>
			<Typography variant='h2'>Pay the game successfully!</Typography>
			<Button variant='contained' onClick={()=> navigate('/games')}>Back to Games</Button>
		</Stack>
	)
}
