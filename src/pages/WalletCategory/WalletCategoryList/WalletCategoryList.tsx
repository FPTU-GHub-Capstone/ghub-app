/* eslint-disable max-lines-per-function */
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

import { WalletCategory } from '../../../common/types'
import { fDate } from '../../../utils'

import GridAction from './GridAction'


interface IWalletCategoryListProps {
	walletCategories: WalletCategory[];
	setWalletCategories: (newAssetType: WalletCategory[]) => void;
	onRowUpdateCompleted: () => void;
}

const rowHeight = 50

const WalletCategoryList: React.FC<IWalletCategoryListProps> = ({
	walletCategories,
	setWalletCategories: setWalletCategories,
	onRowUpdateCompleted,
}) => {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel)
	}

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true
		}
	}

	const processRowUpdate = (newRow: GridRowModel<WalletCategory>) => {
		const updatedRow = { ...newRow }
		const updatedServers = walletCategories.map((row) => (row.id === newRow.id ? updatedRow : row))
		console.log('processrowupdate run')
		onRowUpdateCompleted()
		setWalletCategories(updatedServers)
		return updatedRow
	}

	const columns: GridColDef<WalletCategory, WalletCategory>[] = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 2,
			editable: true,
			renderCell: (params: GridRenderCellParams<WalletCategory, WalletCategory>) => (
				<Typography>{params ? params.row.name : 'UNKNOWN'}</Typography>
			),
		},
		{ field: 'createdAt', headerName: 'Creation Date', flex: 3, editable: false,
			renderCell: (params: GridRenderCellParams<WalletCategory, WalletCategory>) => (
				<Typography>{fDate(new Date(params ? params.row.createdAt : null))}</Typography>
			)
		},
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 2,
			sortable: false,
			filterable: false,
			type: 'actions',
			getActions: (params: GridRowParams<WalletCategory>) => {
				const id = params.id as GridRowId
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

				return [
					<GridAction
						key="save"
						id={id}
						isInEditMode={isInEditMode}
						rowModesModel={rowModesModel} setRowModesModel={setRowModesModel}
						walletCategories={walletCategories} setWalletCategories={setWalletCategories}
						onRowUpdateCompleted={onRowUpdateCompleted}

					/>,
				]
			},
		},
	]

	return (
		<>
			<Box sx={{ minWidth: '100%', height: 400, mt: 2 }}>
				<DataGrid
					rows={walletCategories} columns={columns} editMode="row" rowHeight={rowHeight}
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
		</>
	)
}

WalletCategoryList.propTypes = {
	walletCategories: PropTypes.array.isRequired,
	setWalletCategories: PropTypes.func.isRequired,
	onRowUpdateCompleted: PropTypes.func.isRequired,
}

export default WalletCategoryList
