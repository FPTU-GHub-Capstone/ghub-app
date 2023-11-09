import { Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'

import GamesSearch from '../Games/GamesSearch'

import PermissionList from './PermissionList/PermissionList'
import PermissionForm from './RightDrawer/PermissionForm/PermissionForm'


export const Permission = ({title} : {title: string}) => {
	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
			</Stack>

			<Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
				<GamesSearch />
				<Button 
					variant="contained" 
					size="large"
					sx={{ 
						backgroundColor: 'secondary.light',
						'&:hover': {
							backgroundColor: 'secondary.main',
						}
					}} 
				>
					Assign Permission
				</Button>
			</Stack>
			
			<PermissionList />

			<PermissionForm />
			
		</Container>
	)
}
