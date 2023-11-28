import { Snackbar, SxProps, Theme } from '@mui/material'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'
import React from 'react'



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SnackStatus = ({
	title,
	severity,
	openSnack, 
	handleClose,
	sx
}: {
	title: string,
	severity: AlertColor,
	openSnack: boolean,
	handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void,
	sx?: SxProps<Theme>,
}) => {
	return (
		<>
			<Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity} sx={sx ? sx : { width: '100%' } }>
					{title}
				</Alert>
			</Snackbar>
		</>
	)
}

export default SnackStatus
