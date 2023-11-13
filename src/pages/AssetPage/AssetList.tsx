import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { Asset } from './types'


const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Name', flex: 2 },
	{ field: 'image', headerName: 'Image', flex: 2 },
	{ field: 'type', headerName: 'Type', flex: 2 },
	{ field: 'description', headerName: 'Description', flex: 6 },
	{
		field: 'actions',
		headerName: 'Actions',
		flex: 3,
		renderCell: (params: GridRenderCellParams<any>) => (
			<ActionButtons />
		)
	},
	// Add more columns as needed
]


const ActionButtons = () => {
	return(
		<Box>
		</Box>
	)
}

const rowHeight = 50


type AssetTypeProp =  {
	assets: Asset[],
}


const AssetList = ({ assets } : AssetTypeProp ) => {
	return (
		<Box sx={{ minWidth: '100%', height: 400, mt: 2 }}>
			<DataGrid
				rows={assets}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5, 10]}
				disableRowSelectionOnClick
				rowHeight={rowHeight}
			/>
		</Box>
	)

}

export default AssetList
