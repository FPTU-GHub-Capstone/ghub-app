import { GridColDef, GridRenderCellParams, GridRowId, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid'
import { sentenceCase } from 'change-case'
import { Stack, Avatar, Typography } from '@mui/material'



import Label from '../../../../components/Label/Label'

import GridAction from './GridAction'



export const columns: GridColDef[] = [
	{ 
		field: 'picture', 
		headerName: 'Picture',
		flex: 2,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Stack direction="row" alignItems="center" spacing={2}>
				<Avatar alt={params?.row.name} src={params?.row.picture} />
				<Typography variant="subtitle2" noWrap>
					{params?.row.name}
				</Typography>
			</Stack>
		)
	},
	{
		field: 'uid',
		headerName: 'User ID',
		flex: 1.5,
	},
	{
		field: 'name',
		headerName: 'Full Name',
		flex: 2,
		valueGetter: (params: GridValueGetterParams) =>
			`${params?.row.name}`
	},
	{
		field: 'email',
		headerName: 'Email',
		flex: 2.5,
	},
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Label color={params.row.status === undefined || !params?.row.status ? 'error' : 'success'}>{sentenceCase(params.row.status === undefined || !params?.row.status ?  'inactive' : 'active')}</Label>
		),
	},
	{
		field: 'actions', headerName: 'Action', flex: 1,
		type: 'actions',
		getActions: (params: GridRowParams) => {
			const id = params.id as GridRowId
			return [
				<GridAction key={id} row={params.row} />,
			]
		},
	},
]
