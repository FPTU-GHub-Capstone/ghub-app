import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import config from '../../config'
import Iconify from '../../components/Iconify'
import RestService from '../../services/RestService'
import { useDialog } from '../../hooks/useDialog'
import SnackStatus from '../../components/SnackStatus'

import GamesSearch from './GamesSearch'
import GamesSort from './GamesSort'
import GameCard from './GameCard'
import { Game } from './types'
import CreateGameDialog from './GameCreateDialog/GameCreateDialog'


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
	const [isOpenCreate, handleOpenCreate, handleCloseCreate] = useDialog()
	const [isSuccessSnackOpen, handleOpenSuccessSnack, handleCloseSuccessSnack] = useDialog()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await RestService.get<GameResponse>(`${config.GMS_URL}/games`)
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
					handleSuccess={() => {
						handleCloseCreate()
						handleOpenSuccessSnack()
					}}
				/> 
			}

			<SnackStatus
				title="Game created successfully."
				severity="success"
				openSnack={isSuccessSnackOpen}
				handleClose={handleCloseSuccessSnack}
			/>
		</Container>
	)
}
