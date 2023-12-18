import { Container, Stack, Typography, Button } from '@mui/material'
import React, { useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useParams } from 'react-router-dom'

import { useDialog } from '../../hooks/useDialog'
import { ACCESS_TOKEN, UserTokenPayload } from '../../common'

import AddMember from './TeamDialogs/AddMember'
import { MemberList } from './MemberList'


function isHasUpdatedGamePermission(decoded: UserTokenPayload, currentGameId: string): boolean {
	return decoded.scp.includes('games:*:update') || decoded.scp.includes(`games:${currentGameId}:update`)
}

export const Team = ({title} : {title: string}) => {
	const [isOpenAdd, handleOpenAdd, handleCloseAdd] = useDialog()
	const accessToken = localStorage.getItem(ACCESS_TOKEN)
	const { gameId } = useParams()

	const decoded = useMemo<UserTokenPayload>(() => {
		return jwtDecode(accessToken)
	}, [accessToken])

	return (
		<>
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
						onClick={handleOpenAdd}
						disabled={!isHasUpdatedGamePermission(decoded, gameId)}
					>
					Add Member
					</Button>
				</Stack>

				<MemberList />

				{isOpenAdd && 
					<AddMember 
						isOpenAdd={isOpenAdd}
						handleCloseAdd={handleCloseAdd}
					/>
				}
			</Container>
		</>
	)
}
