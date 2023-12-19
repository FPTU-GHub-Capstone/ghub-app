import PropTypes from 'prop-types'
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon'
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material'


export const OverviewRevenue = (props) => {
	// eslint-disable-next-line react/prop-types
	const {  sx, value } = props

	return (
		<Card sx={sx} variant="outlined">
			<CardContent>
				<Stack
					alignItems="flex-start"
					direction="row"
					justifyContent="space-between"
					spacing={3}
				>
					<Stack spacing={1}>
						<Typography
							color="text.secondary"
							variant="overline"
						>
              Revenue
						</Typography>
						<Typography variant="h4">
							{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
						</Typography>
					</Stack>
					<Avatar
						sx={{
							backgroundColor: 'error.main',
							height: 56,
							width: 56
						}}
					>
						<SvgIcon>
							<CurrencyDollarIcon />
						</SvgIcon>
					</Avatar>
				</Stack>
				
			</CardContent>
		</Card>
	)
}

OverviewRevenue.prototypes = {
	difference: PropTypes.number,
	positive: PropTypes.bool,
	sx: PropTypes.object,
	value: PropTypes.string.isRequired
}
