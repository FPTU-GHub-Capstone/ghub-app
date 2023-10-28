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
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Typography from '@mui/material/Typography'

import { formatDateToCustomString } from '../../utils'

import { LogEntry } from './types'


type FormattedLogLevel = {
	renderedText: string,
	color: string,
};

enum LogLevel {
	INFO = 'Information',
	WARN = 'Warning',
	ERR = 'Error',
	FTL = 'Fatal',
}

const LogLevelMap = new Map<LogLevel, FormattedLogLevel>([
	[
		LogLevel.INFO,
		{
			renderedText: 'INFO',
			color: '#00bb00',
		},
	],
	[
		LogLevel.WARN,
		{
			renderedText: 'WARN',
			color: '#ff9900',
		},
	],
	[
		LogLevel.ERR,
		{
			renderedText: 'ERR',
			color: '#ff0000',
		},
	],
	[
		LogLevel.FTL,
		{
			renderedText: 'FTL',
			color: '#990000',
		},
	],
])

const Row: React.FC<{ rowData: LogEntry }> = ({ rowData }) => {
	const [isOpen, setIsOpen] = React.useState(false)

	// const logLevelStyles = {
	// 	information: { renderedtext: 'INFO', color: '#00bb00' },
	// 	warning: { renderedtext: 'WARN', color: '#ff9900' },
	// 	error: { renderedtext: 'ERROR', color: '#ff0000' },
	// 	fatal: { renderedtext: 'FATAL', color: '#990000' },
	// }

	const formattedLogLevel: FormattedLogLevel = LogLevelMap.get(rowData.Level as LogLevel) || {
		renderedText: 'UNKNOWN',
		color: '#000',
	}

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
				<TableCell>
					<Typography sx={{ color: formattedLogLevel.color, fontWeight: 600 }}>
						{formattedLogLevel.renderedText}
					</Typography>
				</TableCell>
				<TableCell>
					{formatDateToCustomString(new Date(rowData.UtcTimeStamp))}
				</TableCell>
				<TableCell>{rowData.RenderedMessage}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={isOpen} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Table size="small" aria-label="purchases">
								<TableBody>
									{Object.entries(rowData).map(([key, value]) => (
										<TableRow key={key}>
											<TableCell>{key}</TableCell>
											<TableCell>{renderExpandableProp(value)}</TableCell>
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

function renderExpandableProp(value: unknown) {
	if (typeof value === 'string') return value
	return JSON.stringify(value)
}

const LogTable: React.FC<{ data: LogEntry[] }> = ({ data }) => {
	return (
		<>
			<TableContainer component={Paper} sx={{ maxHeight: 440, width: '100%' }}>
				<Table
					stickyHeader
					size="small"
					aria-label="sticky table collapsible table"
				>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Level</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Message</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((rowData) => (
							<Row key={rowData._id} rowData={rowData} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default LogTable
