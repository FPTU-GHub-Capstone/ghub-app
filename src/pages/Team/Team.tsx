import { Container, Stack, Typography, Button } from '@mui/material'
import React from 'react'

import { useDialog } from '../../hooks/useDialog'

import AddMember from './TeamDialogs/AddMember'
import { MemberList } from './MemberList'


export const Team = ({title} : {title: string}) => {
	const [isOpenAdd, handleOpenAdd, handleCloseAdd] = useDialog()

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
