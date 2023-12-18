import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModesModel, GridRowParams } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

import { Activity } from '../../../common/types'
import { fDate } from '../../../utils'

import GridAction from './ColumnComponent/GridAction'


interface IActivityListTableProps {
	activities: Activity[];
	setActivities: (newActivity: Activity[]) => void;
}

const rowHeight = 50

const ActivityListTable: React.FC<IActivityListTableProps> = ({ activities, setActivities }) => {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
	const [newRowIds, setNewRowIds] = useState<Set<GridRowId>>(new Set())

	useEffect(() => {
		setNewRowIds(new Set())
	}, [activities])

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel)
	}

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true
		}
	}

	const processRowUpdate = (newRow: GridRowModel<Activity>) => {
		const updatedRow = { ...newRow }
		const updatedActivities = activities.map((row) => (row.id === newRow.id ? updatedRow : row))
		if (newRowIds.has(newRow.id)) {
			setNewRowIds((prev) => new Set([...prev].filter((prevId) => prevId !== newRow.id)))
		}
		setActivities(updatedActivities)
		return updatedRow
	}

	const columns: GridColDef<Activity, Activity>[] = [
		{ field: 'name', headerName: 'Name', flex: 3, editable: true },
		{ field: 'status', headerName: 'Status', flex: 3, editable: true },
		{ field: 'createdAt', headerName: 'Creation Date', flex: 3, editable: false,
			renderCell: (params: GridRenderCellParams<Activity, Activity>) => (
				<Typography>{fDate(new Date(params ? params.row.createdAt : null))}</Typography>
			)
		},
		{
			field: 'actions', headerName: 'Actions', flex: 3, sortable: false, filterable: false,
			type: 'actions',
			getActions: (params: GridRowParams<Activity>) => {
				const id = params.id as GridRowId
		
				return [
					<GridAction key="save" id={id} />,
				]
			},
		},
	]

	return (
		<Box sx={{ minWidth: '100%', height: 400, mt: 2 }}>
			<DataGrid
				rows={activities} columns={columns} editMode="row" rowHeight={rowHeight}
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
	)
}

ActivityListTable.propTypes = {
	activities: PropTypes.array.isRequired,
	setActivities: PropTypes.func.isRequired,
}

export default ActivityListTable


