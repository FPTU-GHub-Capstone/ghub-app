import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { sentenceCase } from 'change-case'
import { Stack, Avatar, Typography, ListItemText, Box } from '@mui/material'

import Label from '../../../../components/Label'
import { PermissionBody } from '../../../../mock/permissions'

import ActionButtons from './ActionButtons'


const Scopes = ({ rowData }) => {

	

}

export const columns: GridColDef[] = [
	{
		field: 'clientId',
		headerName: 'Client ID',
		flex: 2,
	},
	{
		field: 'scopes',
		headerName: 'Scopes',
		flex: 4,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Typography>{params?.row.scopes.join(' ')}</Typography>
		),
	},
	{
		field: 'actions',
		headerName: 'Actions',
		flex: 1,
		renderCell: (params: GridRenderCellParams<any>) => (
			<ActionButtons />
		),
	},
]
