import { useState, useEffect } from 'react'
import { Button, Container, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import RestService from '../../services/RestService'
import { Asset , AssetType } from '../../common/types'



import { AssetList } from './AssetList'


type AssetResponse = {
	isError: boolean,
	message: string,
	result: Asset[],
};

type AssetTypeResponse = {
	isError: boolean,
	message: string,
	result: AssetType[],
};

const AssetAddBtn = () => {
	return (
		<Button
			variant="contained" 
			size="large"
			sx={{ 
				backgroundColor: 'secondary.light',
				'&:hover': {
					backgroundColor: 'secondary.main',
				},
			}}
		>
		Add an Asset
		</Button>
	)
}

export const AssetPage = ({ title }: { title: string }) => {
	const [assets, setAssets] = useState<Asset[]>([])
	const [originalAssets, setOriginalAssets] = useState<Asset[]>([])
	const [gameId, setGameId] = useState<string | null>(null)
	const location = useLocation()

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		setGameId(extractedGameId)
	}, [location.pathname])

	useEffect(() => {
		const fetchAsset = async () => {
			try {
				const assetTypeResponse = await RestService.get<AssetTypeResponse>('http://localhost:8080/v1/gms/asset-types')
				const assetResponse = await RestService.get<AssetResponse>('http://localhost:8080/v1/gms/assets')
				
				const assetResult = assetResponse.data.result
				const assetTypeResult = assetTypeResponse.data.result

				const filteredAssets = assetResult.filter((asset) => {
					return (
						asset.assetTypeId &&
						assetTypeResult.some((assetType) => assetType.gameId === gameId && assetType.id === asset.assetTypeId)
					)
				})

				setAssets(filteredAssets)
				if (originalAssets.length === 0) {
					setOriginalAssets(filteredAssets)
				}
				console.log(originalAssets)
			} catch (error) {
				console.error('Error fetching asset type data:', error)
			}
		}
		fetchAsset()
	}, [ gameId, originalAssets ])

	const handleChangeAsset = ( newAsset: Asset[] ) => { 
		setAssets(newAsset) 
	}

	return (
		<>
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				</Stack>

				<Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
					<AssetAddBtn />
				</Stack>

				<AssetList assets={assets} setAssets={handleChangeAsset} />
			</Container>
		</>
	)
}
