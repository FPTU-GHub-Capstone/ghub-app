/* eslint-disable max-lines-per-function */
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { Box, Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material'

import { BillStatus, RU_PRICE, USD_TO_VND, WU_PRICE } from '../../../common'
import Iconify from '../../../components/Iconify'
import { fCurrency, fShortenNumber } from '../../../utils/formatNumber'
import Label from '../../../components/Label'


type GameCardProps = {
	title: string,
	image: string,
	status: string,
	readUnit: number,
	writeUnit: number,
	billId: string,
	handleSelectBill: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const Info = styled('div')(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-start',
	marginTop: theme.spacing(1),
	color: theme.palette.text.disabled,
}))

const statusLabelColor = {
	[BillStatus.OVERDUE]: 'error',
	[BillStatus.PAID]: 'success',
	[BillStatus.PENDING]: 'warning',
}

export default function GameCard({ title, image, status, readUnit, writeUnit, billId, handleSelectBill }: GameCardProps) {
	const BILL_INFO = [
		{ number: readUnit, icon: 'eva:eye-fill' },
		{ number: writeUnit, icon: 'jam:write-f' },
	]

	return (
		<Card sx={{ maxWidth: 345 }} variant="outlined">
			<CardMedia
				sx={{ height: 200 }}
				image={image}
				title={title}
			/>

			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Info>
						{BILL_INFO.map((info, infoIndex) => (
							<Box
								key={infoIndex}
								sx={{
									display: 'flex',
									alignItems: 'center',
									mr: 3,
								}}
							>
								<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
								<Typography variant="caption">{fShortenNumber(info.number as number)}</Typography>
							</Box>
						))}
					</Info>

					<Label color={statusLabelColor[status]} sx={{ paddingY: 2, paddingX: 3 }}>{status.toLocaleUpperCase()}</Label>
				</Stack>


				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={3}
				>
					<Typography variant="h3" color="primary.main" marginTop={3}>
						{fCurrency(readUnit * RU_PRICE + writeUnit * WU_PRICE)}
						<span style={{ fontSize: '15px', color: 'text.secondary' }}>$</span>
					</Typography>

					<Typography variant="h3" color="secondary.main" marginTop={3}>
						{fCurrency((readUnit * RU_PRICE + writeUnit * WU_PRICE) * USD_TO_VND)}
						<span style={{ fontSize: '15px', color: 'text.secondary' }}>vnd</span>
					</Typography>
				</Stack>



			</CardContent>
			<CardActions>
				<FormGroup>
					{status !== BillStatus.PAID &&
						<FormControlLabel
							control={
								<Checkbox
									color='success'
									name={billId}
									sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
									onChange={handleSelectBill}
								/>}
							label="Added to your pay list"
							disabled={status === BillStatus.PAID}
							labelPlacement="end"
							sx={{ marginRight: 'auto', paddingX: 1 }}
						/>}
				</FormGroup>
				{/* {status === BillStatus.PENDING ? <Button size="large" >Pay now</Button> : <Typography >Paid</Typography>} */}
			</CardActions>
		</Card>
	)
}
