import { alpha } from '@mui/material/styles'
import { Box, Card, Grid, Typography, CardContent, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { fDate } from '../../../utils/formatTime'
import { fShortenNumber } from '../../../utils/formatNumber'
import SvgColor from '../../../components/Svg-color'
import Iconify from '../../../components/Iconify'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { setCurrentGame } from '../../../redux/slices/gameSlice'
import { GAME_ID, Game, UserRole } from '../../../common'
import { showError } from '../../../utils/toast'
import Label from '../../../components/Label'

import * as Styled from './styles'


type Props = {
	game: Game,
	index: number,
}

// eslint-disable-next-line max-lines-per-function
export default function GameCard({ game, index }: Props) {
	const { id, banner, name, logo, createdAt, monthlyWriteUnits, isActive } = game
	const isLatestGameLarge = index === 0
	const isLatestGame = index === 1 || index === 2
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const currentUser = useAppSelector(({ auth }) => auth.currentUser)
	const userRole = useAppSelector(({ auth }) => auth.role)

	const GAME_INFO = [
		{ number: monthlyWriteUnits, icon: 'jam:write-f' },
	]

	return (
		<Grid item xs={12} sm={isLatestGameLarge ? 12 : 6} md={isLatestGameLarge ? 6 : 3}>
			<Card sx={{ position: 'relative' }} onClick={() => {
				dispatch(setCurrentGame(game))
				localStorage.setItem(GAME_ID, id)
				if (currentUser !== null && userRole === UserRole.ADMIN) {
					navigate(`/games/${id}/admin/managers`)
				}
				else if (currentUser !== null && userRole === UserRole.USER && isActive) {
					navigate(`/games/${id}/overview`)
				} else {
					showError('The game has been inactive. Please pay bills to continue.')
				}
			}}
			>
				<Styled.CardMedia
					sx={{
						...((isLatestGameLarge || isLatestGame) && {
							pt: 'calc(100% * 4 / 3)',
							'&:after': {
								top: 0,
								content: "''",
								width: '100%',
								height: '100%',
								position: 'absolute',
								bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
							},
						}),
						...(isLatestGameLarge && {
							pt: {
								xs: 'calc(100% * 4 / 3)',
								sm: 'calc(100% * 3 / 4.66)',
							},
						}),
					}}
				>
					<SvgColor
						src="/assets/icons/shape-avatar.svg"
						sx={{
							width: 80,
							height: 36,
							zIndex: 9,
							bottom: -15,
							position: 'absolute',
							color: 'background.paper',
							...((isLatestGameLarge || isLatestGame) && { display: 'none' }),
						}}
					/>
					<Styled.AvatarCustom
						alt='logo'
						src={logo}
						sx={{
							...((isLatestGameLarge || isLatestGame) && {
								zIndex: 9,
								top: 24,
								left: 24,
								width: 40,
								height: 40,
							}),
						}}
					/>

					<Styled.Cover alt={name} src={banner || `/assets/images/covers/cover_${(index % 23) + 1}.jpg`} />
				</Styled.CardMedia>

				<CardContent
					sx={{
						pt: 4,
						...((isLatestGameLarge || isLatestGame) && {
							bottom: 0,
							width: '100%',
							position: 'absolute',
						}),
					}}
				>
					<Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
						{fDate(new Date(createdAt.toString()))}
					</Typography>

					<Styled.Title
						color="inherit"
						variant="subtitle2"
						underline="hover"
						sx={{
							...(isLatestGameLarge && { typography: 'h5', height: 60 }),
							...((isLatestGameLarge || isLatestGame) && {
								color: 'common.white',
							}),
							cursor: 'pointer'
						}}
					>
						{name}
					</Styled.Title>

					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						{!isActive && <Label color='error' sx={{ paddingY: 2, paddingX: 3 }}>Inactive</Label>}
						{GAME_INFO.map((info, infoIndex) => (
							<Box
								key={infoIndex}
								sx={{
									display: 'flex',
									alignItems: 'center',
									ml: infoIndex === 0 ? 0 : 1.5,
									...((isLatestGameLarge || isLatestGame) && {
										color: 'grey.500',
									}),
								}}
							>
								<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
								<Typography variant="caption">{fShortenNumber(info.number as number)}</Typography>
							</Box>
						))}
						
					</Stack>
				</CardContent>
			</Card>
		</Grid>
	)
}
