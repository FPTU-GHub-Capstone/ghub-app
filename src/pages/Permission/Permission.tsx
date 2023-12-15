import { Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'

import { useDialog } from '../../hooks/useDialog'

import PermissionList from './PermissionList/PermissionList'
import CreateClient from './PermissionDialogs/CreateClient'


export const Permission = ({title} : {title: string}) => {
	const [isOpenAssign, handleOpenAssign, handleCloseAssign] = useDialog()

	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
			</Stack>

			<Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
				{/* <GamesSearch /> */}
				<Button 
					variant="contained" 
					size="large"
					sx={{ 
						backgroundColor: 'secondary.light',
						'&:hover': {
							backgroundColor: 'secondary.main',
						}
					}} 
					onClick={handleOpenAssign}
				>
					Create Client
				</Button>
			</Stack>
			
			<PermissionList />

			{isOpenAssign && 
				<CreateClient 
					isOpenAssignDialog={isOpenAssign}
					handleCloseAssignDialog={handleCloseAssign} 
				/>
			}
			
		</Container>
	)
}
