import React from 'react'
import { Container, Stack, Typography } from '@mui/material'

import { PricingPlan as PricingPlanType } from '../../common'

import { planDetails } from './planDetails'


export default function AdminPricing({ title }: { title: string }) {
	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
			</Stack>

			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="body1" sx={{ color: 'text.secondary' }}>
					Managing the pricing plan of your system
				</Typography>
			</Stack>

		</Container>
	)
}
