import { Button, Container, Grid, Stack, Typography } from '@mui/material'

import Iconify from '../../components/Iconify'
import GAMES from '../../mock/game'

import GamesSearch from './GamesSearch'
import GamesSort from './GamesSort'
import GameCard from './GameCard'


type Props = {
	title: string,
}

const SORT_OPTIONS = [
	{ value: 'latest', label: 'Latest' },
	{ value: 'popular', label: 'Popular' },
	{ value: 'oldest', label: 'Oldest' },
]

export const Games = ({ title }: Props) => {
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
				<GamesSearch games={GAMES} />
				<GamesSort options={SORT_OPTIONS} />
			</Stack>

			<Grid container spacing={3}>
				{GAMES.map((game, index) => (
					<GameCard key={game.id} game={game} index={index} />
				))}
			</Grid>
		</Container>
	)
}
