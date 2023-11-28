import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

import { Level } from '../../../common/types'

import GridAction from './GridAction'


interface IGameLevelListProps {
	gameLevels: Level[];
	setGameLevels: (newGameLevel: Level[]) => void;
	onRowUpdateCompleted: () => void;
}

const rowHeight = 50

const GameLevelList: React.FC<IGameLevelListProps> = ({ gameLevels, setGameLevels, onRowUpdateCompleted }) => {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel)
	}

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true
		}
	}

	const processRowUpdate = (newRow: GridRowModel<Level>) => {
		const updatedRow = { ...newRow }
		const updatedLevels = gameLevels.map((row) => (row.id === newRow.id ? updatedRow : row))
		onRowUpdateCompleted()
		setGameLevels(updatedLevels)
		return updatedRow
	}

	const columns: GridColDef<Level, Level>[] = [
		{ 
			field: 'levelNo', headerName: 'Level', flex: 2, editable: false,
			renderCell: (params: GridRenderCellParams<Level, Level>) => (
				<Typography>Lv. {params ? params.row.levelNo : 'UNKNOWN'}</Typography>
			)
		},
		{ field: 'levelUpPoint', headerName: 'Level Up Points', flex: 3, editable: true },
		{ field: 'description', headerName: 'Description', flex: 7, editable: true },
		{
			field: 'actions', headerName: 'Actions', flex: 2, sortable: false, filterable: false,
			type: 'actions',
			getActions: (params: GridRowParams<Level>) => {
				const id = params.id as GridRowId
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
		
				return [
					<GridAction
						key="save" id={id} isInEditMode={isInEditMode}
						rowModesModel={rowModesModel} setRowModesModel={setRowModesModel}
					/>
				]
			},
		},
	]

	return ( <>
		<Box sx={{ minWidth: '100%', height: 400, mt: 2 }}>
			<DataGrid
				rows={gameLevels} columns={columns} editMode="row" rowHeight={rowHeight}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5, 10]}
				disableRowSelectionOnClick
				rowModesModel={rowModesModel} onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
			/>
		</Box>
	</>)
}

GameLevelList.propTypes = {
	gameLevels: PropTypes.array.isRequired,
	setGameLevels: PropTypes.func.isRequired,
	onRowUpdateCompleted: PropTypes.func.isRequired,
}

export default GameLevelList


