import React from 'react'
import { Box, Typography } from '@mui/material'

import { articlesData } from './Article/data'
import { Article } from './Article'
import { SectionStyle, MainHeading , ArticlesDisplay } from './styles'


export const WhyChooseUs : React.FC = () => {
	return (
		<Box component='section' 
			id='landing-why-choosing-us'
			sx={SectionStyle}
		>
			<Typography component='h2' sx={MainHeading}>
				Why GHUB
			</Typography>
			<Typography textAlign='center' mb='25px'>
				Lorem Ipsum is simply dummy text of the printing {' '}<br/>
				and typesetting industry. 
			</Typography>

			<Box component="div"
				sx={ArticlesDisplay}
			>
				{articlesData.map((article, index) => (
					<Article key={index} {...article} />
				))}
			</Box>
		</Box>
	)
}
