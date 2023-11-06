import {
	Stack,
	Container,
	Typography,
	Box,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import USERLIST from '../../mock/user'

import { columns } from './TableColumn'


export default function UsersGM() {

	return (
		<>
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
					<Typography variant="h4" gutterBottom>
						User
					</Typography>
				</Stack>

				<Box sx={{ minWidth: 800, height: 400 }}>
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
