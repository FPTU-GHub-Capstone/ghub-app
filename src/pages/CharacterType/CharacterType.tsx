import React, { useMemo } from 'react'
import {
	Container,
	Stack,
	Typography,
	Button,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { useDialog } from '../../hooks/useDialog'
import { isHasUpdatedGamePermission } from '../../services/AuthService'
import { ACCESS_TOKEN, UserTokenPayload } from '../../common'

import CharacterTypeList from './CharacterTypeList/CharacterTypeList'
import CreateCharacterType from './CharacterTypeDialogs/CreateCharacterType'


export default function CharacterType({title}: {title: string}) {
	const [isOpenCreate, handleOpenCreate, handleCloseCreate] = useDialog()
	const accessToken = localStorage.getItem(ACCESS_TOKEN)
	const { gameId } = useParams()

	const decoded = useMemo<UserTokenPayload>(() => {
		return jwtDecode(accessToken)
	}, [accessToken])

	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
			</Stack>

			<Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
				<div></div>
				<Button 
					variant="contained" 
					size="large"
					sx={{ 
						backgroundColor: 'secondary.light',
						'&:hover': {
							backgroundColor: 'secondary.main',
						}
					}} 
					onClick={handleOpenCreate}
					disabled={!isHasUpdatedGamePermission(decoded, gameId)}
				>
					Create Character Type
				</Button>
			</Stack>

			<CharacterTypeList />

			{isOpenCreate && 
				<CreateCharacterType isOpenCreate={isOpenCreate} handleCloseCreate={handleCloseCreate} />
			}
			
		</Container>
	)
}
