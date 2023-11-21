/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

import { Level } from '../../../common/types'

import GridAction from './ColumnComponent/GridAction'
import { LevelAddBtn } from './components/LevelAddBtn'
import { LevelSaveBtn } from './components/LevelSaveBtn'


interface IGameLevelListProps {
	gameLevels: Level[];
	setGameLevels: (newGameLevel: Level[]) => void;
	setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>> ;
	isDataChanged: boolean;
}

const rowHeight = 50

const GameLevelList: React.FC<IGameLevelListProps> = ({ gameLevels, setGameLevels, setConfirmOpen, isDataChanged }) => {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
	const [newRowIds, setNewRowIds] = useState<Set<GridRowId>>(new Set())
	const [isInitialized, setInitialized] = useState(false)

	useEffect(() => {
		console.log('Updated newRowIds:', newRowIds)
	}, [newRowIds])
	
	useEffect(() => {
		if (!isInitialized) {
			setInitialized(true)
			setNewRowIds(new Set())
			console.log('Initialized')
		}
	}, [gameLevels, isInitialized])

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel)
	}

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true
		}
	}

	const processRowUpdate = (newRow: GridRowModel<Level>) => {
		console.log('processRowUpdate run')
		const updatedRow = { ...newRow }
		const updatedLevels = gameLevels.map((row) => (row.id === newRow.id ? updatedRow : row))
		if (newRowIds.has(newRow.id)) {
			setNewRowIds((prev) => new Set([...prev].filter((prevId) => prevId !== newRow.id)))
		}
		setGameLevels(updatedLevels)
		return updatedRow
	}

	const columns: GridColDef<Level, Level>[] = [
		{ field: 'name', headerName: 'Name', flex: 3, editable: true },
		{ field: 'levelUpPoint', headerName: 'Level Up Points', flex: 7, editable: true },
		{
			field: 'actions', headerName: 'Actions', flex: 2, sortable: false, filterable: false,
			type: 'actions',
			getActions: (params: GridRowParams<Level>) => {
				const id = params.id as GridRowId
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
		
				return [
					<GridAction
						key="save" id={id} isInEditMode={isInEditMode}
						gameLevels={gameLevels} setGameLevels={setGameLevels}
						rowModesModel={rowModesModel} setRowModesModel={setRowModesModel}
						newRowIds={newRowIds} setNewRowIds={setNewRowIds}
					/>,
				]
			},
		},
	]

	return ( <>
		<Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
			<LevelAddBtn
				rows={gameLevels} setRows={setGameLevels}
				setRowModesModel={setRowModesModel}
				newRowIds={newRowIds} setNewRowIds={setNewRowIds}
			/>
			<LevelSaveBtn handleOnClick={() => setConfirmOpen(true)} isDataChanged={isDataChanged} />
		</Stack>

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
	setConfirmOpen: PropTypes.func.isRequired,
	isDataChanged: PropTypes.bool.isRequired,
}

export default GameLevelList


