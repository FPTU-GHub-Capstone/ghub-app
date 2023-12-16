/* eslint-disable max-lines-per-function */
// GridAction.tsx

import React from 'react'
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid'
import { Visibility } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router'



interface IGridActionProps {
	id: GridRowId;
}

const GridAction: React.FC<IGridActionProps> = ({
	id,
}) => {
	const location = useLocation()
	const navigate = useNavigate()

	const handleVisibilityClick = () => {
		const activityDetailsUrl = `${location.pathname}/${id}`
		navigate(activityDetailsUrl)
	}

	return (
		<>
			<GridActionsCellItem
				key="view"
				icon={<Visibility />}
				label="View"
				className="textPrimary"
				onClick={handleVisibilityClick}
				color="inherit"
			/>
		</>
	)
}

export default GridAction
