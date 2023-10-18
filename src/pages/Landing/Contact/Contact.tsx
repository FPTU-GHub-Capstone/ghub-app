import React from 'react'
import { Box, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { ContactForm } from './ContactForm'
import { theme } from './ContactForm/styles'


export const Contact: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<article style={{
				color: 'white',
				backgroundImage: 'url(\'/assets/images/banner/Contact.png\')',
				backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
			id='contact-us-form'
			>
				<Box sx={{
					display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center',
					paddingTop: '25px'
				}}>
					<Typography sx={{fontWeight: '450', fontSize: '2vw'}} component="h2">
						Contact Us
					</Typography>
					<Box>
						<Typography my={2} sx={{fontSize: '1vw'}} component="p">
							If you have any questions, please feel free to contact us. 
						</Typography>
					</Box>
			
				</Box>

				<ContactForm />
			</article>
		</ThemeProvider>
	)
}
