/* eslint-disable max-lines-per-function */
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

import { ActivityType } from '../../../common/types'
import { fDate } from '../../../utils'

import GridAction from './GridAction'


interface IActivityTypeListProps {
	activityTypes: ActivityType[];
	setActivityTypes: (newActivityTypes: ActivityType[]) => void;
	onRowUpdateCompleted: () => void;
}

const rowHeight = 50

const ActivityTypeList: React.FC<IActivityTypeListProps> = ({
	activityTypes,
	setActivityTypes,
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

	const processRowUpdate = (newRow: GridRowModel<ActivityType>) => {
		const updatedRow = { ...newRow }
		const updatedActivityTypes = activityTypes.map((row) => (row.id === newRow.id ? updatedRow : row))
		console.log('processrowupdate run')
		onRowUpdateCompleted()
		setActivityTypes(updatedActivityTypes)
		return updatedRow
	}

	const columns: GridColDef<ActivityType, ActivityType>[] = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 2,
			editable: true,
			renderCell: (params: GridRenderCellParams<ActivityType, ActivityType>) => (
				<Typography>{params ? params.row.name : 'UNKNOWN'}</Typography>
			),
		},
		{
			field: 'characterId',
			headerName: 'characterId',
			flex: 3,
			editable: true,
			renderCell: (params: GridRenderCellParams<ActivityType, ActivityType>) => (
				<Typography>{params ? params.row.characterId : 'UNKNOWN'}</Typography>
			),
		},
		{ field: 'createdAt', headerName: 'Creation Date', flex: 2, editable: false,
			renderCell: (params: GridRenderCellParams<ActivityType, ActivityType>) => (
				<Typography>{fDate(new Date(params ? params.row.createdAt : null))}</Typography>
			)
		},
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 2,
			sortable: false,
			filterable: false,
			type: 'actions',
			getActions: (params: GridRowParams<ActivityType>) => {
				const id = params.id as GridRowId
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

				return [
					<GridAction
						key="save"
						id={id}
						isInEditMode={isInEditMode}
						rowModesModel={rowModesModel} setRowModesModel={setRowModesModel}
						activityTypes={activityTypes} setActivityTypes={setActivityTypes}
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
					rows={activityTypes} columns={columns} editMode="row" rowHeight={rowHeight}
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

ActivityTypeList.propTypes = {
	activityTypes: PropTypes.array.isRequired,
	setActivityTypes: PropTypes.func.isRequired,
	onRowUpdateCompleted: PropTypes.func.isRequired,
}

export default ActivityTypeList
