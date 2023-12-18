import { useState } from 'react'
import { Box, Link, Stack } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams } from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import { Asset } from '../../../common/types'

import GridAction from './ColumnComponent/GridAction'


interface IAssetListProps {
	assets: Asset[];
	setAssets: (newAsset: Asset[]) => void;
	onRowUpdateCompleted: () => void;
}

const rowHeight = 50

const AssetList: React.FC<IAssetListProps> = ({ assets, setAssets, onRowUpdateCompleted }) => {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
	const { gameId } = useParams()
	
	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel)
	}

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true
		}
	}

	const processRowUpdate = (newRow: GridRowModel<Asset>) => {
		const updatedRow = { ...newRow }
		const updatedAssets = assets.map((row) => (row.id === newRow.id ? updatedRow : row))
		onRowUpdateCompleted()
		setAssets(updatedAssets)
		return updatedRow
	}

	const columns: GridColDef<Asset, Asset>[] = [
		{ 
			field: 'image', 
			headerName: 'Image',
			flex: 2,
			renderCell: (params: GridRenderCellParams<any>) => (
				<Link href={params.row.image}>View Image</Link>
			)
		},
		{ field: 'name', headerName: 'Name', flex: 3, editable: true },
		{ field: 'description', headerName: 'Description', flex: 7, editable: true },
		{
			field: 'actions', headerName: 'Actions', flex: 2, sortable: false, filterable: false,
			type: 'actions',
			getActions: (params: GridRowParams<Asset>) => {
				const id = params.id as GridRowId
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
		
				return [
					<GridAction
						key="save" id={id} isInEditMode={isInEditMode} gameId={gameId}
						assets={assets} setAssets={setAssets}
						rowModesModel={rowModesModel} setRowModesModel={setRowModesModel}
						onRowUpdateCompleted={onRowUpdateCompleted}
					/>,
				]
			},
		},
	]

	return (
		<Box sx={{ minWidth: '100%', height: 400, mt: 2 }}>
			<DataGrid
				rows={assets} columns={columns} editMode="row" rowHeight={rowHeight}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5, 10]}
				disableRowSelectionOnClick
				rowModesModel={rowModesModel} onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
			/>
		</Box>
	)
}

AssetList.propTypes = {
	assets: PropTypes.array.isRequired,
	setAssets: PropTypes.func.isRequired,
	onRowUpdateCompleted: PropTypes.func.isRequired,
}

export default AssetList


