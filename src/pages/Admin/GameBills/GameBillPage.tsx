/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { Container, Stack, Typography, Grid } from '@mui/material'
import _ from 'lodash'

import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import {  gameBillsFetch } from '../../../redux/slices/billSlide'

import GameCard from './GameBillCard/Card'


// type GameBillResponse = {
// 	bills: GameBill[],
// };

export const GameBillPage = ({ title }: { title: string }) => {
	// const [gameBills, setGameBills] = useState<GameBill[]>([])
	const games = useAppSelector(({ game }) => game.gameList)
	const bills = useAppSelector(({ bill }) => bill.gameBillList)
	const dispatch = useAppDispatch()
	const [selectedBills, setSelectedBills] = useState<string[]>([])
	// const gameBills = [...bills].sort((a) => {
	// 	if (a.status === BillStatus.PENDING) {
	// 		return -1
	// 	}
	// 	return 1
	// })


	const handleSelectBill = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectBillId = event.target.name
		const billIdList = [...selectedBills]

		if (event.target.checked) {
			billIdList.push(selectBillId)
			setSelectedBills(billIdList)
		}
		else setSelectedBills(billIdList.filter((billId) => billId !== selectBillId))
	}

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		dispatch(gameBillsFetch(extractedGameId))
	}, [dispatch])

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
						{/* <Typography variant="body1" sx={{ color: 'text.secondary' }}>
							Please pay your bills by the end of the 5th of every month
						</Typography> */}
					</Stack>

					{/* <Stack direction="row" spacing={2}>
						<Button
							variant="contained"
							size="large"
							disabled={
								bills.filter((bill) => (
									bill.status == BillStatus.OVERDUE || bill.status == BillStatus.PENDING
								)).length == 0 ? true : false
							}
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
							disabled={selectedBills?.length == 0 ? true : false}
							sx={{
								color: 'secondary.main',
								borderColor: 'secondary.main',
								'&:hover': {
									borderColor: '#fff',
									backgroundColor: 'secondary.lighter',
								}
							}}
							onClick={handlePaySelectedBill}
						>
							Pay selected bills {`(${selectedBills?.length ?? '0'})`}
						</Button>
					</Stack> */}
				</Stack>

				{bills && bills.length > 0 ? (
					<Stack>
						<Grid container spacing={4}>
							{bills.map((bill, index) => {
								const foundGame = games.find((game) => game.id === bill.gameId)

								return (
									<Grid key={bill._id} item xs={4}>
										<GameCard
											title={foundGame ? foundGame.name : 'Game'}
											image={
												foundGame
													? foundGame.banner
													: `/assets/images/covers/cover_${(index % 23) + 1}.jpg`
											}
											status={bill.status}
											readUnit={bill.readUnits}
											writeUnit={bill.writeUnits}
											billId={bill._id}
											handleSelectBill={handleSelectBill}
										/>
									</Grid>
								)
							})}
						</Grid>
					</Stack>
				) : (
					<Typography variant='body2'>{'This game\'s bill is currently empty'}</Typography>
				)}
			</Container>
		</>
	)
}
