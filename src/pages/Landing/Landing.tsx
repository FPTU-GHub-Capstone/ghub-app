import React from 'react'
import { Button, Card, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { Contact } from './Contact'
import { WhyChooseUs } from './WhyChooseUs'
import { BtnLogin, BtnRegister, LandingHeaderSection, BtnLayout, landingHeading, landingPageStyle } from './styles'

import bannerImg from '/assets/images/banner/dashboard.png'


export const Landing: React.FC = () => {
	return (
		<>
			<div style={landingPageStyle} id="landing-main">
				<LandingHeaderSection component="section">
					<Typography component="h1" sx={landingHeading}>
						Game Pushing System
					</Typography>
					<Typography component="p">
						A completely new way to manage your games
					</Typography>
					<BtnLayout>
						<Button component={RouterLink} to="/register" variant="contained" sx={BtnLogin}>
							Sign up
						</Button>
						<Button component={RouterLink} to="/login" variant="contained" sx={BtnRegister}>
							Sign In
						</Button>
					</BtnLayout>
					<Card variant="outlined">
						<img
							src={bannerImg}
							alt="GHUB Dashboard layout"
							width="100%"
						/>
					</Card>
					
				</LandingHeaderSection>

				<WhyChooseUs />
			</div>
			<Contact />
		</>
	)
}
