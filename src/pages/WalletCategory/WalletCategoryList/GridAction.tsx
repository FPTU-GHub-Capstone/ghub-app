import React from 'react'
import { GridActionsCellItem, GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid'
import { Edit, Delete, Cancel, Save } from '@mui/icons-material'

import { AssetType } from '../../../common'


interface IGridActionProps {
	id: GridRowId;
	isInEditMode: boolean;
	walletCategories: AssetType[];
	setWalletCategories: (newWalletCategories: AssetType[]) => void;
	onRowUpdateCompleted: () => void;
	rowModesModel: GridRowModesModel;
	setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

const GridAction: React.FC<IGridActionProps> = ({
	id,
	isInEditMode,
	walletCategories,
	setWalletCategories,
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
		setWalletCategories(walletCategories.filter((row) => row.id !== id))
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
