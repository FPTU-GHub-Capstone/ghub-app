import React, { useState } from 'react'

import LogTable from './LogTable'


// eslint-disable-next-line react/prop-types
const TerminalQuery = ({ data, setData }) => {
	const handleIncrement = () => {
		setData(data + 1)
	}

	return (
		<>
			<p>Terminal</p>
			<button onClick={handleIncrement}>Increment Data</button>
		</>
	)
}


// eslint-disable-next-line react/prop-types
const Chart = ({data}) => {
	return (
		<>
			<p>Calls data in chart: {data}</p>
		</>
	)
}

export const Logging: React.FC = () => {
	const [data, setData] = useState(1)

	return (
		<>
			<TerminalQuery data={data} setData={setData} />
			<Chart data={data} />
			<LogTable data={data} />
		</>
	)
}

export default Logging
