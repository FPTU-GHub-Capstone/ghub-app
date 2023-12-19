/* eslint-disable max-lines-per-function */
import { useState, useEffect, useCallback } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import config from '../../config'
import { RestService } from '../../services/RestService'
import { AssetType, Game, HttpResponseGMS } from '../../common/types'
import { useDialog } from '../../hooks/useDialog'
import { getCurrentGame } from '../../services/GameService'

import { AssetTypeList } from './AssetTypeList'
import { AssetTypeAddBtn } from './components/AssetTypeAddBtn' // Updated import for clarity
import CreateAssetTypeDialog from './CreateAssetTypeDialog'


const restSvc = RestService.getInstance()

export const AssetTypePage = ({ title }: { title: string }) => {
	const [assetTypes, setAssetTypes] = useState<AssetType[]>([])
	const [originalAssetTypes, setOriginalAssetTypes] = useState<AssetType[]>([])
	const [ game, setGame ] = useState<Game>()
	const [isAssetTypeAddFormOpen, handleOpenAssetTypeAddForm, handleCloseAssetTypeAddForm] = useDialog()
	const [isChanged, setChanged] = useState(0)
	const [isUpdateRequired, setUpdateRequired] = useState(false)
	const {gameId} = useParams()

	useEffect(() => {
		fetchGame(gameId)
		fetchAssetTypes(gameId)
	}, [gameId])

	useEffect(() => {
		if (isChanged > 0) {
			fetchAssetTypes(gameId)
		}
	}, [isChanged, gameId])

	const fetchAssetTypes = async (inputGameId: string) => {
		try {
			const assetTypesResponse = await restSvc.get<HttpResponseGMS<AssetType>>(
				`${config.GMS_URL}/games/${inputGameId}/asset-types`
			)
			const AssetTypesResult = assetTypesResponse.data.result as AssetType[]
			setAssetTypes(AssetTypesResult)
			setOriginalAssetTypes(AssetTypesResult)
		} catch (error) {
			console.error('Error fetching asset type data:', error)
		}
	}

	const fetchGame = async (inputGameId: string) => {
		try {
			const response = await getCurrentGame(inputGameId)
			if (!response.isError) {
				const gameResult: Game = (response as HttpResponseGMS<Game>)
					.result as Game
				setGame(gameResult)
			} else {
				console.log('Game Get problem')
			}
		} catch (error) {
			console.error('Error fetching game data:', error)
		}
	}


	const updateAssetTypes = useCallback(async () => {
		for (const originalAssetType of originalAssetTypes) {
			const assetTypeId = originalAssetType.id
			const updatedAssetType = assetTypes.find(assetType => assetType.id === assetTypeId)

			if (updatedAssetType) {
				if (JSON.stringify(updatedAssetType) !== JSON.stringify(originalAssetType)) {
					try {
						await restSvc.put(`${config.GMS_URL}/games/${gameId}/asset-types/${assetTypeId}`, updatedAssetType)
					} catch (error) {
						console.error(`Error updating asset Type with id ${assetTypeId}:`, error)
					}
				}
			} else {
				try {
					await restSvc.delete(`${config.GMS_URL}/games/${gameId}/asset-types/${assetTypeId}`)
				} catch (error) {
					console.error(`Error deleting asset with id ${assetTypeId}:`, error)
				}
			}
		}
		fetchAssetTypes(gameId)
	}, [originalAssetTypes, assetTypes, gameId])

	useEffect(() => {
		if (isUpdateRequired) {
			updateAssetTypes()
			setUpdateRequired(false)
		}
	}, [isUpdateRequired, updateAssetTypes])

	const handleChangeAssetTypes = (newAssetType: AssetType[]) => {
		setAssetTypes(newAssetType)
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
					<AssetTypeAddBtn handleOnClick={handleOpenAssetTypeAddForm} />
				</Stack>

				{gameId &&
					<AssetTypeList
						assetTypes={assetTypes}
						setAssetTypes={handleChangeAssetTypes}
						onRowUpdateCompleted={() => setUpdateRequired(true)}
					/>
				}

				{isAssetTypeAddFormOpen && game &&
					<CreateAssetTypeDialog
						isOpenCreateAssetTypeDialog={isAssetTypeAddFormOpen}
						handleCloseAssetTypeAddForm={handleCloseAssetTypeAddForm}
						toggleChanged={() => {
							console.log('toggle Changed')
							setChanged(isChanged + 1)
						}}
						currentGame={game}
					/>
				}
			</Container>
		</>
	)
}
