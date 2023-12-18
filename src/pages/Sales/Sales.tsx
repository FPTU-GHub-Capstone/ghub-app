import { Box, Container, Unstable_Grid2 as Grid, Typography } from '@mui/material'

import { useRevenue } from '../../hooks/useRevenue'
// import { useClient } from '../../hooks/useClients'

import { OverviewRevenue } from './Components/OverviewRevenue/OverviewRevenue'
import { OverviewSales } from './Components/OverviewSales/OverviewSales'
// import { OverviewUsers } from './Components/OverviewUsers/OverviewUsers'


const Sales = () => {

	const {revenue, revenueList} = useRevenue()
	// const {clientNumber} = useClient()
	return (
		<Container >
			<Typography variant="h4" gutterBottom>
				Sales
			</Typography>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="xl">
					<Grid container spacing={3}>
						<Grid xs={12} sm={6} lg={3}>
							{
								revenue && <OverviewRevenue
									sx={{ height: '100%' }}
									value= {revenue}
								/>
							}
						</Grid>
						{/* <Grid xs={12} sm={6} lg={3}>
							{clientNumber &&<OverviewUsers
								difference={16}
								positive={false}
								sx={{ height: '100%' }}
								value= {clientNumber.toString()}
							/>}
						</Grid> */}
						<Grid xs={12} lg={8}>
							{
								revenue && <OverviewSales
									chartSeries={[
										{
											name: 'Revenue',
											data: revenueList,
										},
									]}
									sx={{ height: '100%' }}
								/>
							}
						</Grid>
						{/* <Grid xs={12} md={6} lg={4}>
						
						</Grid>
						<Grid xs={12} md={6} lg={4}>
							
						</Grid>
						<Grid xs={12} md={12} lg={8}>
							
						</Grid> */}
					</Grid>
				</Container>
			</Box>
		</Container>
	)
}

export default Sales
