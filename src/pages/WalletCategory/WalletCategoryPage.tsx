/* eslint-disable max-lines-per-function */
import { useState, useEffect, useCallback } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import config from '../../config'
import { RestService } from '../../services/RestService'
import { AssetType, Game, HttpResponseGMS, WalletCategory } from '../../common/types'
import { useDialog } from '../../hooks/useDialog'

import WalletCategoryList from './WalletCategoryList'
import { WalletCategoryAddBtn } from './components/WalletCategoryAddBtn' // Updated import for clarity
import CreateWalletCategoryDialog from './CreateWalletCategoryDialog'


const restSvc = RestService.getInstance()

export const WalletCategoryPage = ({ title }: { title: string }) => {
	const [walletCategories, setWalletCategories] = useState<WalletCategory[]>([])
	const [originalWalletCategories, setOriginalWalletCategories] = useState<WalletCategory[]>([])
	const [isWalletCategoryAddFormOpen, handleOpenWalletCategoryAddForm, handleCloseWalletCategoryAddForm] = useDialog()
	const [isChanged, setChanged] = useState(0)
	const [isUpdateRequired, setUpdateRequired] = useState(false)
	const {gameId} = useParams()

	useEffect(() => {
		fetchGame(gameId)
		fetchWalletCategories(gameId)
	}, [gameId])

	useEffect(() => {
		if (isChanged > 0) {
			fetchWalletCategories(gameId)
		}
	}, [isChanged, gameId])

	const fetchWalletCategories = async (inputGameId: string) => {
		try {
			const walletCategoriesResponse = await restSvc.get<HttpResponseGMS<AssetType>>(
				`${config.GMS_URL}/games/${inputGameId}/wallet-categories`
			)
			const walletCategoriesResult = walletCategoriesResponse.data.result as AssetType[]
			setWalletCategories(walletCategoriesResult)
			setOriginalWalletCategories(walletCategoriesResult)
		} catch (error) {
			console.error('Error fetching wallet category data:', error)
		}
	}

	const fetchGame = async (inputGameId: string) => {
		try {
			const gameResponse = await restSvc.get<HttpResponseGMS<Game>>(`${config.GMS_URL}/games/${inputGameId}`)
			const gameResult: Game = gameResponse.data.result as Game
			localStorage.setItem('currentGame', JSON.stringify(gameResult))
		} catch (error) {
			console.error('Error fetching game data:', error)
		}
	}

	const updateAssetTypes = useCallback(async () => {
		for (const originalWalletCategory of originalWalletCategories) {
			const walletCategoryId = originalWalletCategory.id
			const updatedWalletCategory = walletCategories.find(walletCategory => walletCategory.id === walletCategoryId)

			if (updatedWalletCategory) {
				if (JSON.stringify(updatedWalletCategory) !== JSON.stringify(originalWalletCategory)) {
					try {
						await restSvc.put(`${config.GMS_URL}/games/${gameId}/wallet-categories/${walletCategoryId}`, updatedWalletCategory)
					} catch (error) {
						console.error(`Error updating  wallet category with id ${walletCategoryId}:`, error)
					}
				}
			} else {
				try {
					await restSvc.delete(`${config.GMS_URL}/games/${gameId}/wallet-categories/${walletCategoryId}`)
				} catch (error) {
					console.error(`Error deleting wallet category with id ${walletCategoryId}:`, error)
				}
			}
		}
		fetchWalletCategories(gameId)
	}, [originalWalletCategories, walletCategories, gameId])

	useEffect(() => {
		if (isUpdateRequired) {
			updateAssetTypes()
			setUpdateRequired(false)
		}
	}, [isUpdateRequired, updateAssetTypes])

	const handleChangeAssetTypes = (newAssetType: AssetType[]) => {
		setWalletCategories(newAssetType)
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
					<WalletCategoryAddBtn handleOnClick={handleOpenWalletCategoryAddForm} />
				</Stack>

				{gameId &&
					<WalletCategoryList
						walletCategories={walletCategories}
						setWalletCategories={handleChangeAssetTypes}
						onRowUpdateCompleted={() => setUpdateRequired(true)}
					/>
				}

				{isWalletCategoryAddFormOpen && 
					<CreateWalletCategoryDialog
						isOpenCreateWalletCategoryDialog={isWalletCategoryAddFormOpen}
						handleCloseWalletCategoryAddForm={handleCloseWalletCategoryAddForm}
						toggleChanged={() => {
							console.log('toggle Changed')
							setChanged(isChanged + 1)
						}}
					/>
				}
			</Container>
		</>
	)
}
