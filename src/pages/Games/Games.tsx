import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import config from '../../config'
import Iconify from '../../components/Iconify'
import RestService from '../../services/RestService'
import { useDialog } from '../../hooks/useDialog'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { gamesFetch } from '../../redux/slices/gameSlice'

import GamesSearch from './GamesSearch'
import GamesSort from './GamesSort'
import GameCard from './GameCard'
import CreateGameDialog from './GameCreateDialog/GameCreateDialog'


type Props = {
	title: string,
}

const SORT_OPTIONS = [
	{ value: 'latest', label: 'Latest' },
	{ value: 'popular', label: 'Popular' },
	{ value: 'oldest', label: 'Oldest' },
]

export const Games = ({ title }: Props) => {
	// const [games, setGames] = useState<Game[]>([])
	const [isOpenCreate, handleOpenCreate, handleCloseCreate] = useDialog()

	const dispatch = useAppDispatch()

	const games = useAppSelector(({ game }) => game.gameList)
	useEffect(() => {
		dispatch(gamesFetch())
		// console.log(`@player:: ${players}`)
	}, [dispatch])
	
	const handleSuccess = () => {
		handleCloseCreate()
		dispatch(gamesFetch())
	}

	return (
		<Container>
			<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
				<Button variant="contained" sx={{ backgroundColor: 'primary.dark'}} startIcon={<Iconify icon="eva:plus-fill" />}
					onClick={() =>  handleOpenCreate()}
				>
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

			{isOpenCreate &&
				<CreateGameDialog
					isOpenCreateGameDialog={isOpenCreate} handleCloseCreateGameDialog={() => handleCloseCreate()}
					handleSuccess={handleSuccess}
				/> 
			}
		</Container>
	)
}
