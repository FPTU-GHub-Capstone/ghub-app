import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'


function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
	price: number,
) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history: [
			{
				date: '2020-01-05',
				customerId: '11091700',
			},
			{
				date: '2020-01-02',
				customerId: 'Anonymous',
			},
		],
	}
}

function Row(props: { row: ReturnType<typeof createData> }) {
	const { row } = props
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.calories}</TableCell>
				<TableCell align="right">{row.fat}</TableCell>
				<TableCell align="right">{row.carbs}</TableCell>
				<TableCell align="right">{row.protein}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={isOpen} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								History
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Customer</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.history.map((historyRow) => (
										<TableRow key={historyRow.date}>
											<TableCell component="th" scope="row">
												{historyRow.date}
											</TableCell>
											<TableCell>{historyRow.customerId}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
	createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
	createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
	createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
	createData('Cheesecake', 321, 11.5, 49, 3.6, 4.25),
	createData('Brownie', 245, 8.2, 42, 2.8, 3.99),
	createData('Tiramisu', 452, 14.8, 33, 6.2, 4.75),
	createData('Lollipop', 54, 0.2, 14, 0.1, 1.49),
	createData('Pancake', 129, 3.5, 24, 1.7, 2.29),
	createData('Muffin', 356, 13.7, 58, 4.2, 3.89),
	createData('Chocolate Chip Cookie', 152, 7.0, 20, 2.1, 1.99),
	createData('Donut', 200, 10.0, 25, 2.5, 1.79),
	createData('Red Velvet Cake', 311, 11.4, 51, 3.9, 4.49),
	createData('Pumpkin Pie', 323, 11.3, 50, 3.5, 3.99),
	createData('Caramel Candy', 48, 0.9, 12, 0.2, 1.29),
	createData('Honeycomb', 197, 5.2, 40, 1.3, 3.49),
	createData('Toffee', 125, 5.1, 20, 0.7, 1.89),
	createData('Macaron', 79, 2.0, 13, 0.9, 2.99),
	createData('Cotton Candy', 94, 0.0, 23, 0.0, 1.19),
	createData('Peanut Butter Cup', 88, 4.9, 8, 2.2, 1.39),
	createData('Butterscotch', 45, 0.2, 12, 0.1, 1.29),
	createData('Fruitcake', 252, 3.3, 47, 1.4, 3.79),
	createData('Jelly Bean', 49, 0.0, 14, 0.1, 1.09),
	createData('Gummy Bear', 87, 0.2, 21, 0.1, 1.29),
	createData('Marshmallow', 103, 0.2, 26, 0.6, 1.19),
	createData('Lava Cake', 358, 12.3, 48, 4.1, 4.59),
	createData('Popcorn', 387, 14.5, 74, 6.3, 2.99),
	createData('Pretzel', 363, 1.9, 75, 2.5, 1.79),
	createData('Molten Chocolate Cake', 458, 17.2, 62, 4.7, 5.99),
	createData('Rocky Road Ice Cream', 218, 9.6, 30, 3.1, 3.39),
	createData('Shortbread Cookie', 114, 4.4, 17, 1.9, 2.09),
	createData('Caramel Popcorn', 158, 2.4, 35, 0.9, 1.99),
	createData('Fudge Brownie', 180, 6.7, 27, 2.4, 2.29),
	createData('Pineapple Upside-Down Cake', 242, 9.0, 45, 1.8, 3.69),
	createData('Fruit Salad', 78, 0.3, 20, 0.9, 2.49),
	createData('Jelly Donut', 289, 14.3, 40, 3.4, 1.59),
	createData('Cherry Pie', 316, 11.6, 49, 3.1, 4.29),
	createData('Oreo Cookie', 160, 7.0, 24, 1.3, 1.79),
	createData('Pecan Pie', 502, 20.4, 64, 4.9, 4.99),
	createData('Chocolate Truffle', 62, 3.0, 9, 0.7, 2.89),
	createData('Peach Cobbler', 118, 4.1, 25, 1.5, 3.29),
	createData('Rice Krispies Treat', 82, 0.7, 19, 0.9, 1.19),
	createData('Black Forest Cake', 288, 11.0, 41, 2.4, 3.99),
	createData('Mango Sorbet', 76, 0.4, 19, 0.6, 2.49),
]

// eslint-disable-next-line react/prop-types
export default function LogTable({data}) {
	return (
		<>
			<Typography>Data count in Log Table : {data} </Typography>
			<TableContainer component={Paper} sx={{ maxHeight: 440, width: '100%' }}>
				<Table stickyHeader aria-label="sticky table collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Dessert (100g serving)</TableCell>
							<TableCell align="right">Calories</TableCell>
							<TableCell align="right">Fat&nbsp;(g)</TableCell>
							<TableCell align="right">Carbs&nbsp;(g)</TableCell>
							<TableCell align="right">Protein&nbsp;(g)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<Row key={row.name} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>

		</>

	)
}
