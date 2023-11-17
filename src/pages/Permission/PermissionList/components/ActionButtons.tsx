import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Edit, Delete } from '@mui/icons-material'

import { useDialog } from '../../../../hooks/useDialog'
import UpdatePermission from '../../PermissionDialogs/UpdateClient'


export default function ActionButtons() {
	const [isOpenUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()

	return (
		<Box
			sx={{
				alignItems: 'center',
				justifyContent: 'space-around',
			}}
		>
			<Box sx={{display: 'flex'}}>
				<IconButton onClick={handleOpenUpdate}>
					<Tooltip title="Detail / Edit" placement="bottom">
						<Edit sx={{ fontSize: '1.3rem' }} />
					</Tooltip>
				</IconButton>
				<IconButton>
					<Tooltip title="Remove" placement="bottom">
						<Delete sx={{ fontSize: '1.3rem' }} />
					</Tooltip>
				</IconButton>
			</Box>

			{isOpenUpdate && 
				<UpdatePermission 
					isOpenUpdate={isOpenUpdate}
					handleCloseUpdate={handleCloseUpdate}
				/>
			}
			
		</Box>
	)
}
