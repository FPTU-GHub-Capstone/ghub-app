import React, {useEffect, useState} from 'react'
import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import { Link , useNavigate } from 'react-router-dom'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'


import LoginForm from './LoginForm'


const Root = styled('div')(({ theme }) => ({
	width: '100%',
	...theme.typography.body2,
	'& > :not(style) ~ :not(style)': {
		marginTop: theme.spacing(2),
	},
}))


const DividerOr = <Root>
	<Divider role="presentation">OR</Divider>
</Root>


export const Login: React.FC = () => {
	const [googleCredential, setGoogleCredential] = useState<CredentialResponse>()
	//const [profile, setProfile ] = useState([])
	const navigate = useNavigate()

	const responseMessage = (res: CredentialResponse) => {
		console.log(res)
		setGoogleCredential(res ? res : {})
	}
	const errorMessage = () => {
		console.log('Error')
	}
	useEffect(() => {
		if (googleCredential) {
			console.log('Use effect ! Navigate to root')
			navigate('/')
		}
	}, [googleCredential, navigate]) 
	return (
		<>
			<Container maxWidth="sm" component="section">
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					alignItems: 'center',
					paddingTop: '25px'
				}}>
					<Typography sx={{fontWeight: '450', fontSize: '2vw'}} component="h1">
						Welcome to GHub!
					</Typography>
					<Box>
						<Typography my={2} sx={{fontSize: '1vw'}} component="p">
							Please sign-in to your account and start the adventure
						</Typography>					
					</Box>
			
				</Box>

				<LoginForm />

				{DividerOr}
				<Box component='div' sx={{display: 'flex', padding: '15px', justifyContent: 'space-around'}}>

					<GoogleLogin shape='pill' onSuccess={responseMessage} onError={errorMessage} />
				</Box>
				<Typography component="div" sx={{display: 'flex', justifyContent: 'center', fontWeight: '400', paddingTop: '15px'}}>
					New on our platform?
					<Link style={{ textDecoration: 'none', color: '#DC7000', paddingLeft: '5px' }} to="/register" >
						Create an account
					</Link>
				</Typography>
			</Container>
		</>
	)
}
