/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react'
import { Box, Container, Stack, Typography, Button, Breadcrumbs, Link, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions} from '@mui/material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'

import { RestService } from '../../services/RestService'
import config from '../../config'
//import { useAppDispatch, useAppSelector } from '../../redux/hook'
//import { playersFetch } from '../../redux/slices/playerSlice'
import { useDialog } from '../../hooks/useDialog'
import { Game, HttpResponseGMS } from '../../common'
import SnackStatus from '../../components/SnackStatus'
import { getCurrentGame } from '../../services/GameService'

import GameDetailTable from './components/GameDetailsTable'
import DialogAPI from './components/DialogAPI'
import UpdateGameDialog from './components/UpdateGameDialog'


type GameResponse = {
	isError: boolean,
	message?: string,
	result?: Game,
	responseException?: {
		exceptionMessage: string,
	},
};

const restSvc = RestService.getInstance()

export const GameOverview = () => {
	const [game, setGame] = useState<Game>()
	const {gameId} = useParams()
	const [isDeleteDialogOpen, handleOpenDeleteDialog, handleCloseDeleteDialog] = useDialog()
	const [isUpdateGameDialogOpen, handleOpenUpdateGameDialog, handleCloseUpdateGameDialog] = useDialog()
	const [isDeleteFailedSnackOpen, handleOpenDeleteFailedSnack, handleCloseDeleteFailedSnack] = useDialog()
	const [deleteConfirmation, setDeleteConfirmation] = useState('')
	const [isApiDialogOpen, handleOpenApiDialog, handleCloseApiDialog] = useDialog()
	const [isChanged, setChanged] = useState(0)
	const navigate = useNavigate()
	/*
	const dispatch = useAppDispatch()

	const players = useAppSelector(({ player }) => player.playerList)
	useEffect(() => {
		dispatch(playersFetch())
	}, [dispatch])
	*/
	useEffect(() => {
		fetchGame(gameId)
	}, [gameId])

	useEffect(() => {
		if (isChanged > 0) {
			fetchGame(gameId)
		}
	}, [isChanged, gameId])
	
	const fetchGame = async (inputGameId : string) => {
		try {
			const response = await getCurrentGame(inputGameId)
			console.log(response)
			if (!response.isError) {
				const gameResult: Game = (response as HttpResponseGMS<Game>).result as Game
				setGame(gameResult)
			} else {
				console.log('Game Get problem')
			}
		} catch (error) {
			console.error('Error fetching game Levels data:', error)
		}
	}

	const handleDelete = async () => {
		try {
			if (deleteConfirmation === game?.name) {
				await restSvc.delete<GameResponse>(`${config.GMS_URL}/games/${gameId}`)
				handleCloseDeleteDialog()
				setDeleteConfirmation('')
				navigate('/games')
			} else {
				handleOpenDeleteFailedSnack()
				console.log('Confirmation failed. Please try again.')
			}
		} catch (error) {
			console.error('Error delete game Levels data:', error)
		}
	}

	return (
		<Box>
			{game && (<>
				<Box
					component="img"
					sx={{ width: '100%', height: '250px', objectFit: 'cover' }}
					alt="The house from the offer."
					src={game.banner} 
				/>

				<Container sx={{marginTop: '25px'}}>
					<Breadcrumbs separator="›" aria-label="breadcrumb">
						<Link underline="hover" color="inherit" component={RouterLink} to="/games">
							myProjects
						</Link>
						<Link underline="hover" color="text.primary" component={RouterLink} 
							to={`/games/${gameId}/overview`}
						>
							{game.name}
						</Link>
					</Breadcrumbs>
					<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} mt={1}>
						<Typography variant="h4" gutterBottom>
							{game.name}
						</Typography>
						<Box>
							<Button variant="contained" sx={{ backgroundColor: '#0000dd', marginRight: '10px'}} onClick={handleOpenApiDialog}>
								Your API
							</Button>
							<Button variant="contained" sx={{ backgroundColor: '#0000dd', marginRight: '10px'}}  onClick={handleOpenUpdateGameDialog}>
								Edit your Game
							</Button>
							<Button variant="contained" sx={{ backgroundColor: '#dd2222'}} onClick={handleOpenDeleteDialog}>
								Delete your Game
							</Button>
						</Box>

					</Stack>
					
					<Box sx={{marginTop: '25px'}}>
						<Typography variant='h5'>Project Details</Typography>
						<GameDetailTable game={game} />
					</Box>

					<Box sx={{marginTop: '25px'}}>
						<Typography variant='h5'>Your players statistic</Typography>
						<Typography>Numbers of players: </Typography>
						<Typography>Numbers of banned players</Typography>
					</Box>

					<Box sx={{marginTop: '25px'}}>
						<Typography variant='h5'>Your characters statistic</Typography>
					</Box>

					<Box sx={{marginTop: '25px'}}>
						<Typography variant='h5'>Most recent game activities</Typography>
					</Box>
				</Container>
				<DialogAPI
					isOpenAPIDialog={isApiDialogOpen}
					handleCloseAPIDialog={handleCloseApiDialog}
				/>
				<Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
					<DialogTitle>Confirm Deletion</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To confirm deletion, type the name of the game in the field below:
						</DialogContentText>
						<TextField
							margin="dense"
							id="confirmation"
							placeholder='Enter game name to confirm'
							type="text"
							fullWidth
							value={deleteConfirmation}
							onChange={(e) => setDeleteConfirmation(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
						<Button onClick={handleDelete}>Confirm Delete</Button>
					</DialogActions>
				</Dialog>

				<SnackStatus 
					title='Confirmation failed. Please try again' severity='error' 
					openSnack={isDeleteFailedSnackOpen} 
					handleClose={handleCloseDeleteFailedSnack}
				/>

				{isUpdateGameDialogOpen && 
					<UpdateGameDialog
						currentGame={game}
						isUpdateGameDialogOpen={isUpdateGameDialogOpen}
						handleCloseUpdateGameDialog={handleCloseUpdateGameDialog}
						toggleChanged={() => {
							console.log('toggle Changed')
							setChanged(isChanged + 1)
						}}
					/>
				}
			</>
			)}
		</Box>
	)
}
