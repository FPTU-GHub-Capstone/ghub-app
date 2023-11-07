import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { sentenceCase } from 'change-case'
import { Stack, Avatar, Typography } from '@mui/material'

import Label from '../../../../components/Label'
import { PermissionBody } from '../../../../mock/permissions'

import ActionButtons from './ActionButtons'
import Scopes from './Scopes'


const Users = ({ rowData }: { rowData: PermissionBody }) => {
	return (
		<Stack direction="column" spacing={2} pt={3} sx={{
			flexGrow: 1,
			height: '100%',
		}}>
			<Stack direction="row" alignItems="center" spacing={2}>
				<Avatar alt={rowData.email} src={rowData.avatarUrl} />
				<Typography variant="caption" noWrap>
					{rowData.email}
				</Typography>
			</Stack>

		</Stack>
	)
}

export const columns: GridColDef[] = [
	{
		field: 'email',
		headerName: 'Users',
		flex: 2.5,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Users rowData={params?.row} />
		)
	},
	{
		field: 'scopes',
		headerName: 'Scopes',
		flex: 5,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Scopes rowData={params?.row.scopes} />
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
