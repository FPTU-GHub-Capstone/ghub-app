import { Snackbar } from '@mui/material'
import React from 'react'

import { Alert } from './Alert'


export const SnackStatus = ({
	successPop, errorPop, handleClose,
}: {
	successPop: boolean,
	errorPop: boolean,
	handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void,
}) => {
	return (
		<>
			<Snackbar open={successPop} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Add game to database success!
				</Alert>
			</Snackbar>
			<Snackbar open={errorPop} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Error saving your game to the database...
				</Alert>
			</Snackbar>
		</>
	)
}
