import { Drawer, Slide, Grid } from '@mui/material'
import React from 'react'

import Header from './components/Header'
import ClientForm from './components/ClientForm'


type Props = {
	isOpenAssignDialog: boolean,
	handleCloseAssignDialog: () => void,
}

export default function CreateClient({ isOpenAssignDialog, handleCloseAssignDialog }: Props) {
	return (
		<Drawer
			anchor='right'
			open={isOpenAssignDialog}
			onClose={handleCloseAssignDialog}
			sx={{
				// display: { xs: 'block', sm: 'none' },
				'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '40vw' },
			}}
		>
			<Header titleDialog='Create Client' titleBtn='Save' handleCloseDialog={handleCloseAssignDialog} />

			<ClientForm />

		</Drawer>
	)
}
