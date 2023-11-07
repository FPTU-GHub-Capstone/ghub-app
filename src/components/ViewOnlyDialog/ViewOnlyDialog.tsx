import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
} from '@mui/material'


const ViewOnlyDialog: React.FC<{ open: boolean, onClose: () => void, title: string, contents: string[] }> = ({
	open,
	onClose,
	title,
	contents,
}) => (
	<Dialog open={open} onClose={onClose}>
		<DialogTitle>{title}</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				{contents.map((paragraph, index) => (
					<Typography key={index} variant="body2" gutterBottom>
						{paragraph}
					</Typography>
				))}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={onClose}>Close</Button>
		</DialogActions>
	</Dialog>
)

export default ViewOnlyDialog
