/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import { Button, Container, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import config from '../../config'
import { RestService } from '../../services/RestService'
import { Asset, AssetType } from '../../common/types'
import ConfirmDialog from '../../components/ConfirmDialog'

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
				backgroundColor: 'primary.light',
				'&:hover': {
					backgroundColor: 'primary.main',
				},
			}}
		>
      Add an Asset
		</Button>
	)
}

const AssetSaveBtn = ({
	handleOnClick,
	isDataChanged,
}: {
	handleOnClick: () => void,
	isDataChanged: boolean,
}) => {
	return (
		<Button
			variant="contained"
			size="large"
			sx={{
				backgroundColor: 'secondary.light',
				'&:hover': {
					backgroundColor: 'secondary.main',
				},
				marginLeft: '10px',
			}}
			onClick={handleOnClick}
			disabled={Boolean(!isDataChanged)}
		>
      Save Current State
		</Button>
	)
}

const restSvc = RestService.getInstance()

export const AssetPage = ({ title }: { title: string }) => {
	const [assets, setAssets] = useState<Asset[]>([])
	const [originalAssets, setOriginalAssets] = useState<Asset[]>([])
	const [gameId, setGameId] = useState<string | null>(null)
	const [isConfirmOpen, setConfirmOpen] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		setGameId(extractedGameId)
		fetchAsset(extractedGameId)
	}, [location.pathname])

	const fetchAsset = async (inputGameId: string) => {
		try {
			const assetTypeResponse = await restSvc.get<AssetTypeResponse>(
				`${config.GMS_URL}/asset-types`,
			)
			const assetResponse = await restSvc.get<AssetResponse>(
				`${config.GMS_URL}/assets`,
			)

			const assetResult = assetResponse.data.result
			const assetTypeResult = assetTypeResponse.data.result

			const filteredAssets = assetResult.filter((asset) => {
				return (
					asset.assetTypeId &&
					assetTypeResult.some((assetType) => assetType.gameId === inputGameId && assetType.id === asset.assetTypeId)
				)
			})

			setAssets(filteredAssets)
			setOriginalAssets(filteredAssets)
		} catch (error) {
			console.error('Error fetching asset type data:', error)
		}
	}

	const handleConfirm = async () => {
		setConfirmOpen(false)

		for (const originalAsset of originalAssets) {
			const assetId = originalAsset.id

			const updatedAsset = assets.find((asset) => asset.id === assetId)

			if (updatedAsset) {
				if (JSON.stringify(updatedAsset) !== JSON.stringify(originalAsset)) {
					try {
						await restSvc.put(
							`${config.GMS_URL}/assets/${assetId}`,
							updatedAsset,
						)
					} catch (error) {
						console.error(`Error updating asset with id ${assetId}:`, error)
					}
				}
			} else {
				try {
					await restSvc.delete(`${config.GMS_URL}/assets/${assetId}`)
				} catch (error) {
					console.error(`Error deleting asset with id ${assetId}:`, error)
				}
			}
		}
		fetchAsset(gameId)
	}

	const handleChangeAsset = (newAsset: Asset[]) => {
		setAssets(newAsset)
	}
	const isDataChanged =
    JSON.stringify(assets) !== JSON.stringify(originalAssets) ? true : false

	return (
		<>
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={3}
				>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				</Stack>

				<Stack
					mb={5}
					direction="row"
					alignItems="center"
					justifyContent="flex-end"
				>
					<AssetAddBtn />
					<AssetSaveBtn
						handleOnClick={() => setConfirmOpen(true)}
						isDataChanged={isDataChanged}
					/>
				</Stack>

				<AssetList assets={assets} setAssets={handleChangeAsset} />

				<ConfirmDialog
					open={isConfirmOpen}
					title="Confirm Save Data"
					message="Are you sure you want to save current state of Assets ?"
					onCancel={() => setConfirmOpen(false)}
					onConfirm={handleConfirm}
				/>
			</Container>
		</>
	)
}
