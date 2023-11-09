import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import Iconify from '../../components/Iconify'
import RestService from '../../services/RestService'

import GamesSearch from './GamesSearch'
import GamesSort from './GamesSort'
import GameCard from './GameCard'
import { Game } from './types'


type Props = {
	title: string,
}

const SORT_OPTIONS = [
	{ value: 'latest', label: 'Latest' },
	{ value: 'popular', label: 'Popular' },
	{ value: 'oldest', label: 'Oldest' },
]

type GameResponse = {
	isError: boolean,
	message: string,
	result: Game[],
}

export const Games = ({ title }: Props) => {
	const [games, setGames] = useState<Game[]>([])

	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await RestService.get<GameResponse>('http://localhost:8080/v1/gms/games')
				console.log(response.data.result)
				setGames(response.data.result)
			} catch (error) {
				console.error('Error fetching game data:', error)
			}
		}
		fetchData()
	}, [])
	
	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
				<Button variant="contained" sx={{ backgroundColor: 'primary.dark'}} startIcon={<Iconify icon="eva:plus-fill" />}>
					New Game
				</Button>
			</Stack>

			<Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
				<GamesSearch games={games} />
				<GamesSort options={SORT_OPTIONS} />
			</Stack>

			<Grid container spacing={3}>
				{games.map((game, index) => (
					<GameCard key={game.id} game={game} index={index} />
				))}
			</Grid>
		</Container>
	)
}
