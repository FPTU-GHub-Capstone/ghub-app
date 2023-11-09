import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

import Iconify from '../../components/Iconify'

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

export const Games = ({ title }: Props) => {
	const [games, setGames] = useState<Game[]>([])

	useEffect(() => {
		axios.get('http://localhost:8080/v1/gms/games')
			.then((response) => {
				const gameData = response.data.result
				setGames(gameData)
				console.log(gameData)
			})
			.catch((error) => {
				console.error('Error fetching game data:', error)
			})
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
