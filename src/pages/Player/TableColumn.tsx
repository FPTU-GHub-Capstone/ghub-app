import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { sentenceCase } from 'change-case'
import { Stack, Avatar, Typography } from '@mui/material'

import Label from '../../components/Label'



export const columns: GridColDef[] = [
	{ 
		field: 'name', 
		headerName: 'Name',
		flex: 2,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Stack direction="row" alignItems="center" spacing={2}>
				<Avatar alt={params?.row.name} src={params?.row.avatarUrl} />
				<Typography variant="subtitle2" noWrap>
					{params?.row.name}
				</Typography>
			</Stack>
		)
	},
	{
		field: 'company',
		headerName: 'Company',
		flex: 2,
	},
	{
		field: 'role',
		headerName: 'Role',
		flex: 2,
	},
	{
		field: 'verified',
		headerName: 'Verified',
		flex: 1,
		valueGetter: (params: GridValueGetterParams) =>
			params?.row.isVerified ? 'Yes' : 'No',
	},
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Label color={(params?.row.status === 'banned' && 'error') || 'success'}>{sentenceCase(params?.row.status)}</Label>
		),
	},
]
