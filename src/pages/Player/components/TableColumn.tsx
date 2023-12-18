import { GridColDef, GridRenderCellParams, GridRowId, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid'
import { sentenceCase } from 'change-case'
import { Stack, Avatar, Typography } from '@mui/material'

import Label from '../../../components/Label'

import GridAction from './GridAction'



export const columns: GridColDef[] = [
	{ 
		field: 'username', 
		headerName: 'Username',
		flex: 2,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Stack direction="row" alignItems="center" spacing={2}>
				<Avatar alt={params?.row.username} src={params?.row.avatar} />
				<Typography variant="subtitle2" noWrap>
					{params?.row.username}
				</Typography>
			</Stack>
		)
	},
	{
		field: 'fullName',
		headerName: 'Full Name',
		flex: 1.5,
		valueGetter: (params: GridValueGetterParams) =>
			`${params?.row.firstName} ${params?.row.lastName}`,
	},
	{
		field: 'email',
		headerName: 'Email',
		flex: 2,
	},
	{
		field: 'phone',
		headerName: 'Phone',
		flex: 2,
	},
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Label color={(params?.row.status === 0 && 'error') || 'success'}>{sentenceCase(params?.row.status != 0 ? 'banned' : 'active')}</Label>
		),
	},
	{
		field: 'actions', headerName: 'Actions', flex: 2,
		type: 'actions',
		getActions: (params: GridRowParams) => {
			const id = params.id as GridRowId
			return [
				<GridAction key={id} />,
			]
		},
	},
]
