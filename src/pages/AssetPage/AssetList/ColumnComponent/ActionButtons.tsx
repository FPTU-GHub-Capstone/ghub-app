import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Edit, Delete, Visibility } from '@mui/icons-material'


export const ActionButtons = () => {
	return (
		<Box
			sx={{
				width: '11rem',
				alignItems: 'center',
				justifyContent: 'space-around',
				flexGrow: 1,
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'center', }}>
				<IconButton>
					<Tooltip title="View">
						<Visibility sx={{ fontSize: '1.3rem' }} />
					</Tooltip>
				</IconButton>
				<IconButton>
					<Tooltip title="Edit">
						<Edit sx={{ fontSize: '1.3rem' }} />
					</Tooltip>
				</IconButton>
				<IconButton>
					<Tooltip title="Remove">
						<Delete sx={{ fontSize: '1.3rem' }} />
					</Tooltip>
				</IconButton>
			</Box>

		</Box>
	)
}
