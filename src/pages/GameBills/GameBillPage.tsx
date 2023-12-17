/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { Container, Stack, Typography, Grid, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'

import config from '../../config'
import { RestService } from '../../services/RestService'
import { GameBill } from '../../common/types'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { BillStatus } from '../../common'
import { billsFetch } from '../../redux/slices/billSlide'

import GameCard from './GameBillCard/Card'


type GameBillResponse = {
	bills: GameBill[],
};

type CreatePaymentResponse = {
	url: string,
	status: number,
};

const restSvc = RestService.getInstance()

export const GameBillPage = ({ title }: { title: string }) => {
	const [gameBills, setGameBills] = useState<GameBill[]>([])
	const games = useAppSelector(({ game }) => game.gameList)
	const bills = useAppSelector(({ bill }) => bill.billList)
	const dispatch = useAppDispatch()
	const [selectedBills, setSelectedBills] = useState<string[]>()

	const handlePayAllBills = async () => {
		const res = await restSvc.post<CreatePaymentResponse>(
			`${config.IDP_URL}/payments/create-url`,
		)
		const paymentUrl = res.data.url
		window.location.href = paymentUrl
	}

	const handleSelectBill = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectGameId = event.target.name
		const gameIdList = _.cloneDeep(selectedBills)

		if(event.target.checked) setSelectedBills([...gameIdList, selectGameId])
		else setSelectedBills(gameIdList.filter((gameId) => gameId !== selectGameId))
		console.log(selectedBills)
	}

	useEffect(() => {
		dispatch(billsFetch())
		const billResult = _.cloneDeep(bills)
		billResult.sort((a) => {
			if (a.status === BillStatus.PENDING) {
				return -1
			}
			return 1
		})
		setGameBills(billResult)
	}, [dispatch, bills])

	return (
		<>
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Stack direction="column">
						<Typography variant="h4" gutterBottom>
							{title}
						</Typography>
						<Typography variant="body1" sx={{ color: 'text.secondary' }}>
						Please pay your bills by the end of the 5th of every month
						</Typography>
					</Stack>

					<Stack direction="row" spacing={2}>
						<Button 
							variant="contained" 
							size="large"
							sx={{ 
								backgroundColor: 'secondary.light',
								'&:hover': {
									backgroundColor: 'secondary.main',
								}
							}} 
							onClick={handlePayAllBills}
						>
						Pay all bills
						</Button>
						<Button 
							variant="outlined" 
							size="large"
							sx={{ 
								color: 'secondary.main',
								borderColor: 'secondary.main',
								'&:hover': {
									borderColor: '#fff',
									backgroundColor: 'secondary.lighter',
								}
							}} 
							onClick={handlePayAllBills}
						>
							Pay selected bills {`(${selectedBills?.length ?? '0'})`}
						</Button>
					</Stack>
				</Stack>

				{gameBills && gameBills.length > 0 ? (
					<Stack>
						<Grid container spacing={4}>
							{gameBills.map((bill) => {
								const foundGame = games.find((game) => game.id === bill.gameId)

								return (
									<Grid key={bill._id} item xs={4}>
										<GameCard
											title={foundGame ? foundGame.name : 'Game'}
											image={
												foundGame
													? foundGame.banner
													: 'https://loremflickr.com/640/480'
											}
											status={bill.status}
											readUnit={bill.readUnits}
											writeUnit={bill.writeUnits}
											gameId={bill.gameId}
											handleSelectBill={handleSelectBill}
										/>
									</Grid>
								)
							})}
						</Grid>
					</Stack>
				) : (
					<></>
				)}
			</Container>
		</>
	)
}
