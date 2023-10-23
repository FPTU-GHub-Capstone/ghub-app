import {
	Container,
	Box,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import USERLIST from '../../mock/user'

import { columns } from './TableColumn'


export default function Player() {

	return (
		<>
			<Container>
				<Box sx={{ minWidth: 800, height: 400, mt: 2 }}>
					<DataGrid
						rows={USERLIST}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5, 10, 25]}
						checkboxSelection
						disableRowSelectionOnClick
					/>
				</Box>
			</Container>
		</>
	)
}
