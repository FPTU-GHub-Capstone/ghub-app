import { alpha } from '@mui/material/styles'
import { Box, Card, Grid, Typography, CardContent } from '@mui/material'
import { faker } from '@faker-js/faker'
import { useNavigate } from 'react-router-dom'

import { fDate } from '../../../utils/formatTime'
import { fShortenNumber } from '../../../utils/formatNumber'
import SvgColor from '../../../components/Svg-color'
import Iconify from '../../../components/Iconify'
import { Game } from '../types'

import * as Styled from './styles'


type Props = {
	game: Game,
	index: number,
}

// eslint-disable-next-line max-lines-per-function
export default function GameCard({ game, index }: Props) {
	const { id, link, name, logo, createdAt } = game
	const isLatestGameLarge = index === 0
	const isLatestGame = index === 1 || index === 2
	const navigate = useNavigate()
	
	const GAME_INFO = [
		{ number: faker.number.int({ min: 0, max: 100000 }), icon: 'eva:message-circle-fill' },
		{ number:  faker.number.int({ min: 0, max: 100000000 }), icon: 'eva:eye-fill' },
		{ number: faker.number.int({ min: 0, max: 100000 }), icon: 'eva:share-fill' },
	]

	return (
		<Grid item xs={12} sm={isLatestGameLarge ? 12 : 6} md={isLatestGameLarge ? 6 : 3}>
			<Card sx={{ position: 'relative' }} onClick={() => {navigate(`/games/${id}/players`)}}
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

					<Styled.Cover alt={name} src={`/assets/images/covers/cover_${index + 1}.jpg` || link} />
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
						{fDate(new Date(createdAt))}
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
						}}
					>
						{name}
					</Styled.Title>

					<Styled.Info>
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
					</Styled.Info>
				</CardContent>
			</Card>
		</Grid>
	)
}
