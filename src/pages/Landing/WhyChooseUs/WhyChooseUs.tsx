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
			<Typography textAlign='center' sx={{ maxWidth: '52vw', margin: '0 auto', marginBottom: '5px' }}>
				GHUB redefines game management with an intuitive interface for handling game assets, characters, servers, and player accounts seamlessly. Say goodbye to complexity and effortlessly manage your game resources.
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
