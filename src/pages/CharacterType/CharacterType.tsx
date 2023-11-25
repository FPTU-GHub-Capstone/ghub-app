import React from 'react'
import {
	Container,
	Stack,
	Typography,
	Button,
} from '@mui/material'

import { useDialog } from '../../hooks/useDialog'

import CharacterTypeList from './CharacterTypeList/CharacterTypeList'


export default function CharacterType({title}: {title: string}) {
	const [isOpenCreate, handleOpenCreate, handleCloseCreate] = useDialog()

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
				>
					Create Character Type
				</Button>
			</Stack>

			<CharacterTypeList />
		</Container>
	)
}
