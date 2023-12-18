import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import Iconify from '../../components/Iconify'
import { useDialog } from '../../hooks/useDialog'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { gamesFetch } from '../../redux/slices/gameSlice'
import { billsFetch } from '../../redux/slices/billSlide'
import { UserRole } from '../../common'

import GamesSearch from './GamesSearch'
import GamesSort from './GamesSort'
import GameCard from './GameCard'
import CreateGameDialog from './GameCreateDialog/GameCreateDialog'


type Props = {
	title: string,
}

const SORT_OPTIONS = [
	{ value: 'latest', label: 'Latest' },
	{ value: 'oldest', label: 'Oldest' },
]

export const Games = ({ title }: Props) => {
	// const [games, setGames] = useState<Game[]>([])
	const [isOpenCreate, handleOpenCreate, handleCloseCreate] = useDialog()
	const [gameSearch, setGameSearch] = useState('')

	const dispatch = useAppDispatch()
	const userRole = useAppSelector(({ auth }) => auth.role)
	const games = useAppSelector(({ game }) => game.gameList)
	const gameResult = games.filter((game) => {
		if (gameSearch != '') {
			if(game.id == gameSearch) return game
		} else return game
	})
	useEffect(() => {
		dispatch(gamesFetch())
		dispatch(billsFetch())
		// console.log(`@player:: ${players}`)
	}, [dispatch])
	
	const handleSuccess = () => {
		handleCloseCreate()
		dispatch(gamesFetch())
	}

	return (
		<Container>
			{userRole ? <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
				<Button variant="contained" sx={{ backgroundColor: 'primary.dark'}} startIcon={<Iconify icon="eva:plus-fill" />}
					onClick={() =>  handleOpenCreate()}
				>
					New Game
				</Button>
			</Stack> : <></>}

			<Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
				<GamesSearch games={games} setGameSearch={setGameSearch} />
				<GamesSort options={SORT_OPTIONS} />
			</Stack>

			<Grid container spacing={3}>
				{gameResult.map((game, index) => (
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
