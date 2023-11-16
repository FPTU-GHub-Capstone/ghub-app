import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'


interface IConfirmDialogProps {
	open: boolean;
	title: string;
	message: string;
	onCancel: () => void;
	onConfirm: () => void;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
	open,
	title,
	message,
	onCancel,
	onConfirm,
}) => {
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{message}</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirm} color="primary">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmDialog
