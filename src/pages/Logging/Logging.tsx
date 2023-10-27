import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { logData } from './data.ts'
import LogTable from './LogTable'
import { ILogEntry } from './types.ts'


const TerminalQuery = () => {
	return (
		<Box sx={{marginBottom: '30px'}} >
			<p>Terminal</p>
		</Box>
	)
}

const Chart = () => {
	return (
		<div style={{marginBottom: '30px', padding: '10px'}}>
			<p>Calls data in chart</p>
		</div>
	)
}

export const Logging: React.FC = () => {
	const [data, setData] = useState<ILogEntry[]>(logData)
	const navigate = useNavigate()

	useEffect(() => {
		const interval = setInterval(() => {
			const firstElement = data[0]
			const currentTimestamp = new Date() 

			const newEntry = {
				...firstElement,
				UtcTimeStamp: currentTimestamp.toISOString(),
				_id: firstElement._id + 1, 
			}

			const newData = [newEntry, ...data]
			if (newData.length > 30) {
				setData(newData.slice(0, 30))
			} else {
				setData(newData)
			}
		}, 10000) 

		return () => {
			clearInterval(interval)
		}
	}, [data])


	return (
		<>
			<Box sx={{padding: '15px'}}>
				<button onClick={() => navigate(-1)}>Go back to previous page</button>

				<TerminalQuery />
				<Box sx={{padding: '15px', margin: '15px'}}>
					<Chart />
					<LogTable data={data} />
				</Box>
			</Box>
		</>
	)
}

export default Logging
