import { GridColDef, GridRenderCellParams, GridRowId, GridRowParams } from '@mui/x-data-grid'

import GridAction from './GridAction'


export const columns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		flex: 1.5,
	},
	{
		field: 'description',
		headerName: 'Description',
		flex: 3,
	},
	{
		field: 'baseProperties',
		headerName: 'Base Properties',
		flex: 4,
	},
	{
		field: 'actions',
		headerName: 'Actions',
		flex: 1.5,
		type: 'actions',
		getActions: (params: GridRowParams) => {
			const id = params.id as GridRowId
			return [
				<GridAction key={id} rowData={params.row} />,
			]
		},
	},
]
