import React from 'react'
import { Box, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { ContactForm } from './ContactForm'
import { theme } from './ContactForm/styles'
import * as styles from './styles'


export const Contact: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<article style={styles.contactArticle} id="contact-us-form">
				<Box sx={styles.headerBox}>
					<Typography sx={styles.heading} component="h2">
						Contact Us
					</Typography>
					<Box>
						<Typography my={2} sx={styles.description} component="p">
							If you have any questions, please feel free to contact us.
						</Typography>
					</Box>
				</Box>

				<ContactForm />
			</article>
		</ThemeProvider>
	)
}
