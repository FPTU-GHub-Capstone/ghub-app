import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import pusherSvc from '../../services/PusherService'
import config from '../../config'

import LogTable from './LogTable'
import { LogEntry } from './types'
import { logData } from './data'


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
	const [logs, setLogs] = useState<LogEntry[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		const mode: string = 'THUAN_DEV  '
		if (mode != 'THUAN_DEV ') {
			pusherSvc.bindEvent(config.BIND_INSERTED_EVENT, (log: unknown) => {
				setLogs(logs.concat(log as LogEntry))
			})
			
			return () => {
				pusherSvc.unbindEvent(config.BIND_INSERTED_EVENT)
			}
		} else {
			const interval = setInterval(() => {
				const lastElement = logs[logs.length - 1]
				const currentTimestamp = new Date() 
	
				const newEntry = {
					...lastElement,
					UtcTimeStamp: currentTimestamp.toISOString(),
					_id: (Number(lastElement._id) + 1).toString(), 
				}
				const newData = logs.concat(newEntry)
				setLogs(newData)
			}, 5000) 
			return () => {
				clearInterval(interval)
			}
		}
	}, [logs])


	return (
		<>
			<Box sx={{padding: '15px'}}>
				<button onClick={() => navigate(-1)}>Go back to previous page</button>

				<TerminalQuery />
				<Box sx={{padding: '15px', margin: '15px'}}>
					<Chart />
					<LogTable data={logs} />
				</Box>
			</Box>
		</>
	)
}

export default Logging
