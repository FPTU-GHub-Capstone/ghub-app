import { Button, Container, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useParams } from 'react-router-dom'

import { useDialog } from '../../hooks/useDialog'
import { ACCESS_TOKEN, UserTokenPayload } from '../../common'
import { isHasUpdatedGamePermission } from '../../services/AuthService'

import PermissionList from './PermissionList/PermissionList'
import CreateClient from './PermissionDialogs/CreateClient'


export const Permission = ({title} : {title: string}) => {
	const [isOpenAssign, handleOpenAssign, handleCloseAssign] = useDialog()
	const { gameId } = useParams()
	const accessToken = localStorage.getItem(ACCESS_TOKEN)
	const decoded = useMemo<UserTokenPayload>(() => {
		return jwtDecode(accessToken)
	}, [accessToken])

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
					disabled={!isHasUpdatedGamePermission(decoded, gameId)}
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
