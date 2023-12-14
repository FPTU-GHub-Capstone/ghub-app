import React from 'react'
import { Box, Typography } from '@mui/material'

import { ArticleType } from '.'


export const Article: React.FC<ArticleType> = ({ title, content }) => (
	<Box
		component="section"
		sx={{
			width: 'calc(33.33% - 20px)',
			backgroundColor: '#1C140F',
			color: '#fff',
			borderRadius: '15px',
			padding: '50px',
			margin: '10px',
		}}
	>
		<Typography component="h2" mb='10px' sx={{ fontSize: '25px', marginBottom: '40px' }}>{title}</Typography>
		<Typography component="p" sx={{ fontSize: '15px', lineHeight: '1.8' }}>{content}</Typography>
	</Box>
)
