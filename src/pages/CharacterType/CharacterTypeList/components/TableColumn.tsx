import { GridColDef, GridRenderCellParams, GridRowId, GridRowParams } from '@mui/x-data-grid'
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'
import CopyAllIcon from '@mui/icons-material/CopyAll'

import GridAction from './GridAction'


const RenderBaseProperties = ({ params }: { params: GridRenderCellParams<any> }) => {
	const handleCopyClick = async () => {
		try {
			await navigator.clipboard.writeText(JSON.stringify(params?.row.baseProperties))
			console.log('Text successfully copied to clipboard!')
		} catch (err) {
			console.error('Error copying text to clipboard:', err)
		}
	}
	return (
		<Stack direction="row" alignItems="center" spacing={2}>
			<IconButton
				edge="start"
				color="inherit"
				onClick={handleCopyClick}
				aria-label="close"
			>
				<Tooltip title="Copy to Clipboard">
					<CopyAllIcon />
				</Tooltip>
				
			</IconButton>
			<div style={{ width: '100%', overflow: 'auto', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
				<Typography variant='body2'>
					{JSON.stringify(params?.row.baseProperties)}
				</Typography>
			</div>

		</Stack>
	)
}

export const columns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		flex: 2,
	},

	{
		field: 'baseProperties',
		headerName: 'Base Properties',
		flex: 4,
		renderCell: (params: GridRenderCellParams<any>) => (
			<RenderBaseProperties params={params} />
		)
	},
	{
		field: 'description',
		headerName: 'Description',
		flex: 2,
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
