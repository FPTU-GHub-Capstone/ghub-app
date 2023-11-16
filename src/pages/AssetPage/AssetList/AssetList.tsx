import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

import { Asset } from '../../../common/types'

import GridAction from './ColumnComponent/GridAction'


interface IAssetListProps {
	assets: Asset[];
	setAssets: (newAsset: Asset[]) => void;
}

const rowHeight = 50

const AssetList: React.FC<IAssetListProps> = ({ assets, setAssets }) => {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
	const [newRowIds, setNewRowIds] = useState<Set<GridRowId>>(new Set())

	useEffect(() => {
		setNewRowIds(new Set())
	}, [assets])

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
		if (newRowIds.has(newRow.id)) {
			setNewRowIds((prev) => new Set([...prev].filter((prevId) => prevId !== newRow.id)))
		}
		setAssets(updatedAssets)
		return updatedRow
	}

	const columns: GridColDef<Asset, Asset>[] = [
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
						key="save" id={id} isInEditMode={isInEditMode}
						assets={assets} setAssets={setAssets}
						rowModesModel={rowModesModel} setRowModesModel={setRowModesModel}
						newRowIds={newRowIds} setNewRowIds={setNewRowIds}
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
}

export default AssetList


