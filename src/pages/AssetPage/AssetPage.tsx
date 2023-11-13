import { useState, useEffect } from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import RestService from '../../services/RestService'

import { Asset, AssetType } from './types' 
import AssetList from './AssetList'


type AssetResponse = {
	isError: boolean,
	message: string,
	result: Asset[],
}


export const AssetPage = ({title} : {title: string}) => {
	const [assets, setAssets] = useState<Asset[]>([])

	useEffect(() => {
		const fetchAssets = async () => {
			try {
				const response = await RestService.get<AssetResponse>('http://localhost:8080/v1/gms/assets')
				console.log(response.data.result)
				setAssets(response.data.result)
			} catch (error) {
				console.error('Error fetching asset data:', error)
			}
		}

		fetchAssets()
	}, []) // Empty dependency array means this effect runs once when the component mounts

	return (
		<>
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				</Stack>

				<Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
					<Button
						variant="contained" 
						size="large"
						sx={{ 
							backgroundColor: 'secondary.light',
							'&:hover': {
								backgroundColor: 'secondary.main',
							}
						}} 
					>
					Asset Management
					</Button>
				</Stack>

				<AssetList assets={assets} />
			</Container>

			
		</>

	)

}
