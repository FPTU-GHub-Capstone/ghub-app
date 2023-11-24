import { GridColDef, GridRenderCellParams, GridRowId, GridRowParams } from '@mui/x-data-grid'
import { Typography } from '@mui/material'

import GridAction from './GridAction'


export const columns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Client Name',
		flex: 1.5,
	},
	{
		field: 'scope',
		headerName: 'Scopes',
		flex: 4,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Typography>{params?.row.scope}</Typography>
		),
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
