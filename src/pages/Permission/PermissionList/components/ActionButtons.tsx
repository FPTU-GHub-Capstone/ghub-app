import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Edit, Delete } from '@mui/icons-material'


export default function ActionButtons() {
	return (
		<Box
			pt={3}
			sx={{
				width: '11rem',
				alignItems: 'center',
				justifyContent: 'space-around',
				flexGrow: 1,
				height: '100%',
			}}
		>
			<Box sx={{display: 'flex'}}>
				<IconButton>
					<Tooltip title="Edit" placement="bottom">
						<Edit sx={{ fontSize: '1.3rem' }} />
					</Tooltip>
				</IconButton>
				<IconButton>
					<Tooltip title="Remove" placement="bottom">
						<Delete sx={{ fontSize: '1.3rem' }} />
					</Tooltip>
				</IconButton>
			</Box>
			
		</Box>
	)
}
