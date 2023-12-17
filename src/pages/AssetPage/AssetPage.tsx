/* eslint-disable max-lines-per-function */
import { useState, useEffect, useCallback } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import config from '../../config'
import { RestService } from '../../services/RestService'
import { Asset, AssetType, HttpResponseGMS } from '../../common/types'
import { useDialog } from '../../hooks/useDialog'

import { AssetList } from './AssetList'
import { AssetAddBtn } from './components/AssetAddBtn'
import CreateAssetDialog from './CreateAssetDialog'


type AssetResponse = {
	isError: boolean,
	message: string,
	result: Asset[],
};

const restSvc = RestService.getInstance()

export const AssetPage = ({ title }: { title: string }) => {
	const [assets, setAssets] = useState<Asset[]>([])
	const [assetTypes, setAssetTypes] = useState<AssetType[]>([])
	const [originalAssets, setOriginalAssets] = useState<Asset[]>([])
	const [isAssetAddFormOpen, handleOpenAssetAddForm, handleCloseAssetAddForm] = useDialog()
	const [isChanged, setChanged] = useState(0)
	const [isUpdateRequired, setUpdateRequired] = useState(false)
	const {gameId} = useParams()

	useEffect(() => {
		fetchAsset(gameId)
		fetchAssetTypes(gameId)
	}, [gameId])

	useEffect(() => {
		if (isChanged > 0) {
			fetchAsset(gameId)
		}
	}, [isChanged, gameId])

	const fetchAsset = async (inputGameId: string) => {
		try {
			const assetResponse = await restSvc.get<AssetResponse>(
				`${config.GMS_URL}/games/${inputGameId}/assets`,
			)
			const assetResult = assetResponse.data.result
			setAssets(assetResult)
			setOriginalAssets(assetResult)
		} catch (error) {
			console.error('Error fetching asset type data:', error)
		}
	}

	const fetchAssetTypes = async (inputGameId: string) => {
		try {
			const assetTypesResponse = await restSvc.get<HttpResponseGMS<AssetType>>(
				`${config.GMS_URL}/games/${inputGameId}/asset-types`
			)
			const assetTypesResult = assetTypesResponse.data.result as AssetType[]
			setAssetTypes(assetTypesResult)
		} catch (error) {
			console.error('Error fetching asset type data:', error)
		}
	}

	const updateAsset = useCallback(async () => {
		for (const originalAsset of originalAssets) {
			const assetId = originalAsset.id
			const updatedAsset = assets.find((asset) => asset.id === assetId)

			if (updatedAsset) {
				if (JSON.stringify(updatedAsset) !== JSON.stringify(originalAsset)) {
					try {
						await restSvc.put(
							`${config.GMS_URL}/games/${gameId}/assets/${assetId}`,
							updatedAsset,
						)
					} catch (error) {
						console.error(`Error updating asset with id ${assetId}:`, error)
					}
				}
			} else {
				try {
					await restSvc.delete(`${config.GMS_URL}/games/${gameId}/assets/${assetId}`)
				} catch (error) {
					console.error(`Error deleting asset with id ${assetId}:`, error)
				}
			}
		}
		fetchAsset(gameId)
	}, [originalAssets, assets, gameId])

	useEffect(() => {
		if (isUpdateRequired) {
			updateAsset()
			setUpdateRequired(false)
		}
	}, [ isUpdateRequired, updateAsset ])

	const handleChangeAsset = (newAsset: Asset[]) => {
		setAssets(newAsset)
	}

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

				<Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
					<AssetAddBtn handleOnClick={handleOpenAssetAddForm}/>
				</Stack>

				{gameId &&
					<AssetList 
						assets={assets} 
						setAssets={handleChangeAsset} 
						onRowUpdateCompleted={() => setUpdateRequired(true)}
					/>
				}

				{isAssetAddFormOpen && 
					<CreateAssetDialog
						isOpenCreateAssetTypeDialog={isAssetAddFormOpen}
						handleCloseAssetTypeAddForm={handleCloseAssetAddForm}
						toggleChanged={() => {
							console.log('toggle Changed')
							setChanged(isChanged + 1)
						}}
						assetTypeData={assetTypes}
					/>
				}
			</Container>
		</>
	)
}
