import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router'

import { RestService } from '../../services/RestService'
import { Asset, AssetType, Game } from '../../common'
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
};

export const AssetDetail = () => {
	const [asset, setAsset] = useState<Asset>()
	const [assetType, setAssetType] = useState<AssetType>()
	const [game, setGame] = useState<Game>()

	const location = useLocation()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const restSvc = RestService.getInstance()
				const [, , gameId, , assetId] = location.pathname.split('/')
				const assetResponse = await restSvc.get<AssetResponse>(
					`${config.GMS_URL}/games/${gameId}/assets/${assetId}`,
				)
				const gameResponse = await restSvc.get<GameResponse>(
					`${config.GMS_URL}/games/${gameId}`,
				)
				const assetTypeId = assetResponse.data.result.assetTypeId
				const assetTypeResponse = await restSvc.get<AssetTypeResponse>(
					`${config.GMS_URL}/games/${gameId}/asset-types/${assetTypeId}`,
				)

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
		<>
			{asset && assetType && game && (
				<Box>
					<Box
						component="img"
						sx={{ width: '100%', height: '250px', objectFit: 'cover' }}
						alt="The house from the offer."
						src={game.banner} 
					/>
					<Box>
						<Typography variant="h4">Game: {game.name}</Typography>
					</Box>
					<Box>
						<Typography variant="h4">{asset.name}</Typography>
						<img src={asset.image} alt={asset.name} />
						<Typography>Description: {asset.description}</Typography>
					</Box>
					<Box>
						<Typography variant="h4">Asset Type: {assetType.name}</Typography>
					</Box>
				</Box>
			)}
		</>
	)
}
