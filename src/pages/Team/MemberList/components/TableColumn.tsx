import { GridColDef, GridRenderCellParams, GridRowId, GridRowParams } from '@mui/x-data-grid'
import { Stack, Avatar, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import Label from '../../../../components/Label'

import GridAction from './GridAction'


const RenderPermission = ({scope} : {scope: string}) => {
	const { gameId } = useParams()
	const pms = {
		get: scope?.includes(`games:${gameId}:get`),
		update: scope?.includes(`games:${gameId}:update`),
		delete: scope?.includes(`games:${gameId}:delete`),
	}
	return (
		<>
			{pms.get && <Label color='success' sx={{marginRight: 1}}>get</Label>}
			{pms.update && <Label color='warning' sx={{marginRight: 1}}>update</Label>}
			{pms.delete && <Label color='error' sx={{marginRight: 1}}>delete</Label>}
		</>
	)
}


export const columns: GridColDef[] = [
	{ 
		field: 'name', 
		headerName: 'Name',
		flex: 2,
		renderCell: (params: GridRenderCellParams<any>) => (
			<Stack direction="row" alignItems="center" spacing={2}>
				<Avatar alt={params?.row.name ?? params?.row.username} src={params?.row.picture} />
				<Typography variant="subtitle2" noWrap>
					{params?.row.name ?? params?.row.username}
				</Typography>
			</Stack>
		)
	},
	{
		field: 'email',
		headerName: 'Email',
		flex: 2,
	},
	{
		field: 'permission',
		headerName: 'Permission', //get, update, delete
		flex: 2,
		renderCell: (params: GridRenderCellParams<any>) => <RenderPermission scope={params.row?.scope} />,
	},
	{
		field: 'actions', headerName: 'Actions',
		type: 'actions',
		flex: 1,
		getActions: (params: GridRowParams) => {
			const id = params.id as GridRowId
			return [
				<GridAction key={id} />,
			]
		},
	},
]
