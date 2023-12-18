import { GridColDef, GridRenderCellParams, GridRowId, GridRowParams } from '@mui/x-data-grid'
import { Typography, Box } from '@mui/material'

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
		renderCell: (params: GridRenderCellParams<any>) => {
			const scopeArr = (params?.row.scope as string).split(' ')
			return (
				<Box height='100%' width='100%' pt={2} overflow='auto' display="flex" flexDirection="column" justifyContent="center">
					{scopeArr.map((item, index) => <Typography key={index}>{item}</Typography>)}
				</Box>
			)
		},
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
