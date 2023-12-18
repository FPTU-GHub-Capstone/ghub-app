import { Card, CardContent, Divider } from '@mui/material'
import PropTypes from 'prop-types'

import { Chart } from '../Chart/Chart'
import useChartOptions from '../../../../hooks/useCharOptions'


export const OverviewSales = (props) => {
	// eslint-disable-next-line react/prop-types
	const { chartSeries, sx } = props
	const chartOptions = useChartOptions()

	return (
		<Card sx={sx}>
			<CardContent>
				<Chart
					height={350}
					options={chartOptions}
					series={chartSeries}
					type="bar"
					width="100%"
				/>
			</CardContent>
			<Divider />
		</Card>
	)
}

OverviewSales.protoTypes = {
	chartSeries: PropTypes.array.isRequired,
	sx: PropTypes.object,
}
