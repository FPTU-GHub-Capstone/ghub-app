import { useState, useEffect } from 'react'
import { Container, Stack, Typography, Grid } from '@mui/material'
import { useLocation } from 'react-router-dom'

import config from '../../config'
import { RestService } from '../../services/RestService'
import { GameBill } from '../../common/types'
import { useAppSelector } from '../../redux/hook'
import { BillStatus } from '../../common'

import GameCard from './GameBillCard/Card'


type GameBillResponse = {
	bills: GameBill[],
};

const restSvc = RestService.getInstance()

export const GameBillPage = ({ title }: { title: string }) => {
	const [gameBills, setGameBills] = useState<GameBill[]>([])
	const games = useAppSelector(({ game }) => game.gameList)
	const location = useLocation()

	useEffect(() => {
		fetchBill()
	}, [location.pathname])

	const fetchBill = async () => {
		try {
			const res = await restSvc.get<GameBillResponse>(
				`${config.IDP_URL}/bills`,
			)

			const billResult = res.data.bills
			billResult.sort((a) => {
				if (a.status === BillStatus.PENDING) {
					return -1
				}
				return 1
			})
			setGameBills(billResult)
		} catch (error) {
			console.error('Error fetching bill data:', error)
		}
	}

	return (
		<>
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				</Stack>

				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
					<Typography variant="body1" sx={{ color: 'text.secondary' }}>
						Please pay your bills by the end of the 5th of every month
					</Typography>
				</Stack>

				{gameBills && gameBills.length > 0 ? (
					<Stack>
						<Grid container spacing={4}>
							{gameBills.map((bill, index) => {
								const foundGame = games.find((game) => game.id === bill.gameId)

								return (
									<Grid key={bill._id} item xs={4}>
										<GameCard
											title={foundGame ? foundGame.name : 'Game'}
											image={
												foundGame
													? foundGame.banner
													: `/assets/images/covers/cover_${(index % 23) + 1 }.jpg`
											}
											status={bill.status}
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
