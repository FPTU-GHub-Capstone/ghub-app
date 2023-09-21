import React from 'react'
import { Box, TextField } from '@mui/material'
import { Link } from 'react-router-dom'


export const DevNav: React.FC = () => {
	return (
		<>
			<Box>
				<Link to="/login">Login page</Link> <br/>
				<Link to="/register">Register page</Link> <br/>
			</Box>
		</>
	)
}