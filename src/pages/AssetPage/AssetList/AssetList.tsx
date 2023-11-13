import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { Asset } from '../types'

import { ActionButtons } from './ColumnComponent/ActionButtons'


const columns: GridColDef<Asset, Asset>[] = [
	{ field: 'name', headerName: 'Name', flex: 3, },
	{ field: 'description', headerName: 'Description', flex: 7 },
	{
		field: 'actions',
		headerName: 'Actions',
		flex: 2,
		sortable: false,
		filterable: false,
		renderCell: (params: GridRenderCellParams<any>) => (
			<ActionButtons />
		)
	},
]

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


