import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'

import { Client } from '../../../../common'


type Props = {
	titleDialog: string,
	titleBtn: string,
	handleCloseDialog: () => void,
	onSubmit: (data: Client) => void,
	handleSubmit: UseFormHandleSubmit<Client, undefined>,
}

export default function Header({ titleDialog, titleBtn, handleCloseDialog, onSubmit, handleSubmit }: Props) {
	return (
		<AppBar sx={{ position: 'relative', backgroundColor: 'primary.dark', boxShadow: 'none', }}>
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					onClick={handleCloseDialog}
					aria-label="close"
				>
					<CloseIcon />
				</IconButton>
				<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
					{titleDialog}
				</Typography>
				<Button size='large'
					type='submit'
					onClick={handleSubmit(onSubmit)}
					sx={{
						backgroundColor: 'secondary.main',
						color: 'white',
						'&:hover': {
							backgroundColor: 'secondary.dark',
						}
					}}
				>
					{titleBtn}
				</Button>
			</Toolbar>
		</AppBar>
	)
}
