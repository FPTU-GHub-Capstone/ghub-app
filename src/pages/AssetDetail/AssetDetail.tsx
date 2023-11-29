import { useState, useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useLocation } from 'react-router'

import RestService from '../../services/RestService'
import { Asset, AssetType } from '../../common'
import { Game } from '../Games/types'
import config from '../../config'


type AssetResponse = {
	isError: boolean,
	message: string,
	result: Asset,
};

type AssetTypeResponse = {
	isError: boolean,
	message: string,
	result: AssetType,
};

type GameResponse = {
	isError: boolean,
	message: string,
	result: Game,
}

export const AssetDetail = () => {
	const [asset, setAsset] = useState<Asset>()
	const [assetType, setAssetType] = useState<AssetType>()
	const [game, setGame] = useState<Game>()

	const location = useLocation()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [,,gameId,,assetId] = location.pathname.split('/')
				const assetResponse = await RestService.get<AssetResponse>(`${config.GMS_URL}/assets/${assetId}`)
				const gameResponse = await RestService.get<GameResponse>(`${config.GMS_URL}/games/${gameId}`)
				const assetTypeId = assetResponse.data.result.assetTypeId
				const assetTypeResponse = await RestService.get<AssetTypeResponse>(`${config.GMS_URL}/asset-types/${assetTypeId}`)

				setAsset(assetResponse.data.result)
				setAssetType(assetTypeResponse.data.result)
				setGame(gameResponse.data.result)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchData()
	}, [location.pathname])


	return (
		<Container>
			{(asset && assetType && game) &&(
				<>
					<Box>
						<Typography variant="h2">Game: {game.name}</Typography>
						<img src={game.link} alt={'Game banner'} />
					</Box>
					<Box>
						<Typography variant="h2">{asset.name}</Typography>
						<img src={asset.image} alt={asset.name} />
						<Typography>Description: {asset.description}</Typography>
					</Box>
					<Box>
						<Typography variant="h3">Asset Type: {assetType.name}</Typography>
					</Box>

				</>
			)}
		</Container>
	)
}

