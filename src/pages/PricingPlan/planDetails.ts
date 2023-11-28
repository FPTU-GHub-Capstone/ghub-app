import { PricingPlan } from '../../common';


export const planDetails: PricingPlan[] = [
	{
		image: '/assets/images/pages/tree-3.png',
		name: 'Basic',
		description: 'A simple start for everyone',
		price: 0,
		numOfRequest: 1000
	},
	{
		image: '/assets/images/pages/tree-2.png',
		name: 'Standard',
		description: 'For small to medium businesses',
		price: 40,
		numOfRequest: 5000
	},
	{
		image: '/assets/images/pages/tree.png',
		name: 'Enterprise',
		description: 'Solution for big organizations',
		price: 80,
		numOfRequest: 15000
	},
];
