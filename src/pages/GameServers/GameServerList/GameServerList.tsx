/* eslint-disable max-lines-per-function */
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

import { GameServer } from '../../../common/types'

import GridAction from './GridAction'


interface IGameServerListProps {
	gameServers: GameServer[];
	setGameServers: (newGameServers: GameServer[]) => void;
	onRowUpdateCompleted: () => void;
}

const rowHeight = 50

const GameServerList: React.FC<IGameServerListProps> = ({
	gameServers,
	setGameServers,
	onRowUpdateCompleted,
}) => {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel)
	}

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true
		}
	}

	const processRowUpdate = (newRow: GridRowModel<GameServer>) => {
		const updatedRow = { ...newRow }
		const updatedServers = gameServers.map((row) => (row.id === newRow.id ? updatedRow : row))
		console.log('processrowupdate run')
		onRowUpdateCompleted()
		setGameServers(updatedServers)
		return updatedRow
	}

	const columns: GridColDef<GameServer, GameServer>[] = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 2,
			editable: true,
			renderCell: (params: GridRenderCellParams<GameServer, GameServer>) => (
				<Typography>{params ? params.row.name : 'UNKNOWN'}</Typography>
			),
		},
		{ field: 'location', headerName: 'Location', flex: 2, editable: true },
		{ field: 'artifactUrl', headerName: 'Artifact URL',  flex: 3,  editable: true },
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 2,
			sortable: false,
			filterable: false,
			type: 'actions',
			getActions: (params: GridRowParams<GameServer>) => {
				const id = params.id as GridRowId
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

				return [
					<GridAction
						key="save"
						id={id}
						isInEditMode={isInEditMode}
						rowModesModel={rowModesModel} setRowModesModel={setRowModesModel}
						gameServers={gameServers} setGameServers={setGameServers}
						onRowUpdateCompleted={onRowUpdateCompleted}

					/>,
				]
			},
		},
	]

	return (
		<>
			<Box sx={{ minWidth: '100%', height: 400, mt: 2 }}>
				<DataGrid
					rows={gameServers} columns={columns} editMode="row" rowHeight={rowHeight}
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
		</>
	)
}

GameServerList.propTypes = {
	gameServers: PropTypes.array.isRequired,
	setGameServers: PropTypes.func.isRequired,
	onRowUpdateCompleted: PropTypes.func.isRequired,
}

export default GameServerList
