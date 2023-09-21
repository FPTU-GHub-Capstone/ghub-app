import React from 'react'
import { Box, TextField } from '@mui/material'
import { Link } from 'react-router-dom'


export const Error: React.FC = () => {
	return (
		<>
			<Box>
				Not found the page you are looking for.
				<Link to="/">Go back to homepage</Link> <br/>
			</Box>
		</>
	)
}