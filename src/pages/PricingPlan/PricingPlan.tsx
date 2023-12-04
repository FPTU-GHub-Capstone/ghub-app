import React from 'react'
import { Container, Stack, Typography, Card, Button, CardContent } from '@mui/material'

import { PricingPlan as PricingPlanType } from '../../common'

import { planDetails } from './planDetails'


export default function PricingPlan({ title }: { title: string }) {
	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
			</Stack>

			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="body1" sx={{ color: 'text.secondary' }}>
					Choose the best plan to fit your needs
				</Typography>
			</Stack>

			<Stack direction="row" alignItems="center" spacing={3} mb={3}>
				{planDetails.map((plan, index) => <PlanCard key={index} plan={plan} />)}
			</Stack>
		</Container>
	)
}

type PlanCardType = {
	plan: PricingPlanType,
}

const PlanCard = ({ plan }: PlanCardType) => {
	return (
		<Card variant="outlined" sx={{ 
			width: '30%', 
			textAlign: 'center', 
			alignItems: 'center', 
			borderColor: plan.price == 40 ? 'primary.light' : '' }}
		>
			<CardContent>
				<img src={plan.image} alt={plan.name} style={{ paddingTop: 50 }} />
				<Typography gutterBottom variant="h5" component="div">
					{plan.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{plan.description}
				</Typography>
				<Typography variant="h3" color="primary.main" marginY={1.5}>
					{plan.price}
					<span style={{ fontSize: '15px', color: 'text.secondary' }}>$</span>
					<span style={{ fontSize: '15px', color: 'text.secondary' }}>/month</span>
				</Typography>
				<Typography variant="body2" color="text.secondary" marginBottom={3}>
					{plan.numOfRecords} DB records
				</Typography>

				{plan.price == 0 &&
					<Button fullWidth size="large" variant="outlined" color='success'>Your Current Plan</Button>
				}

				{plan.price == 40 &&
					<Button 
						fullWidth
						variant="contained" 
						size="large"
						sx={{ backgroundColor: 'primary.main'}}
					>
						Upgrade
					</Button>
				}

				{plan.price == 80 &&
					<Button 
						fullWidth
						variant="outlined" 
						size="large"
					>
						Upgrade
					</Button>
				}
			</CardContent>
		</Card>
	)
}
