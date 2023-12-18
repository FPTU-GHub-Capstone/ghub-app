import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import { Game } from '../../../common'


const excludedProps: string[] = ['deletedAt', 'attributeGroups', 'activityTypes', 'monthlyReadUnits']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

function GameDetailTable({ game }: { game: Game }) {
	const filteredProps = Object.entries(game).filter(([propName]) => !excludedProps.includes(propName))

	return (
		<TableContainer component={Paper} elevation={3} sx={{marginTop: '15px'}}>
			<Table aria-label="simple table">
				<TableBody>
					{filteredProps.map(([propName, propValue], index) => (
						<StyledTableRow key={`${game.id}-${index}-${propName}`}>
							<StyledTableCell>{propName}</StyledTableCell>
							<StyledTableCell>{String(propValue)}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default GameDetailTable
