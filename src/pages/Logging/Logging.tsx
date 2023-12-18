import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router'

import { PusherService } from '../../services/PusherService'
import config from '../../config'

import LogTable from './LogTable'
import { LogEntry } from './types'


const TerminalQuery = () => {
	return (
		<Box sx={{marginBottom: '30px'}} >
			<p>Terminal</p>
		</Box>
	)
}


export const Logging: React.FC = () => {
	const [logs, setLogs] = useState<LogEntry[]>([])
	const { gameId } = useParams<{ gameId: string }>()
	const pusherSvc = PusherService.getInstance()

	useEffect(() => {
		pusherSvc.bindEvent(gameId, config.BIND_INSERTED_EVENT, (log: unknown) => {
			setLogs(logs.concat(log as LogEntry))
		})
		return () => {
			pusherSvc.unbindEvent(config.BIND_INSERTED_EVENT)
		}
	}, [pusherSvc, gameId, logs])


	return (
		<>
			<Box sx={{padding: '15px'}}>
				<TerminalQuery />
				<Box sx={{padding: '15px', margin: '15px'}}>
					<LogTable data={logs} />
				</Box>
			</Box>
		</>
	)
}

export default Logging
