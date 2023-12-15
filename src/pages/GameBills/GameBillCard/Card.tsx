import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { BillStatus } from '../../../common'
import config from '../../../config'
import { RestService } from '../../../services/RestService'


type GameCardProps = {
	title: string,
	image: string,
	status: string,
}

type CreatePaymentResponse = {
	url: string,
	status: number,
};


const restSvc = RestService.getInstance()

export default function GameCard({title, image, status}:GameCardProps) {
	const navigate = useNavigate()
	const handlePayBill = async () => {
		const res = await restSvc.post<CreatePaymentResponse>(
			`${config.IDP_URL}/payments/create-url`,
		)
		const paymentUrl = res.data.url
		window.location.href = paymentUrl
	}

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 200 }}
				image={image}
				title={title}
			/>
		
			<CardContent>
				<Typography gutterBottom variant="h4" component="div">
					{title}
				</Typography>
				
			</CardContent>
			<CardActions>
				{status === BillStatus.PENDING ? <Button size="large" onClick={handlePayBill}>Pay now</Button> : <Typography >Paid</Typography>}

			</CardActions>
		</Card>
	)
}
