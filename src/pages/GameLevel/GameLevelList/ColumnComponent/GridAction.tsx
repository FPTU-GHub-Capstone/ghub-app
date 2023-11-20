/* eslint-disable max-lines-per-function */
// GridAction.tsx

import React from 'react'
import { GridActionsCellItem, GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid'
import { Edit, Delete, Cancel, Save } from '@mui/icons-material'

import { Level } from '../../../../common/types'


interface IGridActionProps {
	id: GridRowId;
	isInEditMode: boolean;
	gameLevels: Level[];
	setGameLevels: (newGameLevel: Level[]) => void;
	rowModesModel: GridRowModesModel;
	setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
	newRowIds: Set<GridRowId>;
	setNewRowIds: React.Dispatch<React.SetStateAction<Set<GridRowId>>>;
}

const GridAction: React.FC<IGridActionProps> = ({
	id,
	isInEditMode,
	gameLevels,
	setGameLevels,
	rowModesModel,
	setRowModesModel,
	newRowIds,
	setNewRowIds,
}) => {

	const handleEditClick = () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
	}

	const handleSaveClick = () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
	}

	const handleDeleteClick = () => {
		setGameLevels(gameLevels.filter((row) => row.id !== id))
	}

	const handleCancelClick = () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		})

		if (newRowIds.has(id)) {
			setGameLevels(gameLevels.filter((row) => row.id !== id))
			setNewRowIds((prev) => new Set([...prev].filter((prevId) => prevId !== id)))
		}
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
