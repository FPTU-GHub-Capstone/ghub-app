import UsersIcon from '@heroicons/react/24/solid/UsersIcon'
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material'
import PropTypes from 'prop-types'


export const OverviewUsers = (props) => {
	const {  sx, value } = props

	return (
		<Card sx={sx}>
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
              Total Users
						</Typography>
						<Typography variant="h4">
							{value}
						</Typography>
					</Stack>
					<Avatar
						sx={{
							backgroundColor: 'success.main',
							height: 56,
							width: 56
						}}
					>
						<SvgIcon>
							<UsersIcon />
						</SvgIcon>
					</Avatar>
				</Stack>
			
			</CardContent>
		</Card>
	)
}

OverviewUsers.propTypes = {
	difference: PropTypes.number,
	positive: PropTypes.bool,
	value: PropTypes.string.isRequired,
	sx: PropTypes.object
}

