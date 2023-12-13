import React from 'react'
import { GridActionsCellItem, GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid'
import { Edit, Delete, Cancel, Save } from '@mui/icons-material'

import { GameServer } from '../../../common'


interface IGridActionProps {
	id: GridRowId;
	isInEditMode: boolean;
	gameServers: GameServer[];
	setGameServers: (newGameServers: GameServer[]) => void;
	onRowUpdateCompleted: () => void;
	rowModesModel: GridRowModesModel;
	setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

const GridAction: React.FC<IGridActionProps> = ({
	id,
	isInEditMode,
	gameServers,
	setGameServers,
	onRowUpdateCompleted,
	rowModesModel,
	setRowModesModel,
}) => {

	const handleEditClick = () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
	}

	const handleSaveClick = () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
	}

	const handleDeleteClick = () => {
		setGameServers(gameServers.filter((row) => row.id !== id))
		onRowUpdateCompleted()
	}

	const handleCancelClick = () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		})
	}

	return (
		<>
			{isInEditMode ? (
				<>
					<GridActionsCellItem
						key="save"
						icon={<Save />}
						label="Save"
						sx={{ color: 'primary.main' }}
						onClick={handleSaveClick}
					/>
					<GridActionsCellItem
						key="cancel"
						icon={<Cancel />}
						label="Cancel"
						className="textPrimary"
						onClick={handleCancelClick}
						color="inherit"
					/>
				</>
			) : (
				<>
					<GridActionsCellItem
						key="edit"
						icon={<Edit />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick}
						color="inherit"
					/>
					<GridActionsCellItem
						key="delete"
						icon={<Delete />}
						label="Delete"
						onClick={handleDeleteClick}
						color="inherit"
					/>
				</>
			)}
		</>
	)
}

export default GridAction
