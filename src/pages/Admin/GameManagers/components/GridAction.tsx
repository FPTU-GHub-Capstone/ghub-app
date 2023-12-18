import { Visibility } from '@mui/icons-material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import { Button } from '@mui/material'

import { RestService } from '../../../../services/RestService'
import config from '../../../../config'
import SnackStatus from '../../../../components/SnackStatus/SnackStatus'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { usersFetch } from '../../../../redux/slices/userSlide'
import { useDialog } from '../../../../hooks/useDialog'
import { showError, showSuccess } from '../../../../utils/toast'


const resetService = RestService.getInstance()
export default function GridAction({ row }: any) {
	const currentGameId = useAppSelector(({ game }) => game.currentGame.id)
	const dispatch = useAppDispatch()

	const fetchUsers = async () => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		dispatch(usersFetch(extractedGameId))
	}

	const handleUpdateUser = async () => {
		try {
			const { data } = await resetService.put(
				config.IDP_URL + `/users/${row.uid}/update-status`,
				{
					status: row.status === undefined || row.status ? false : true,
				},
			)
			// handleOpenSuccessSnack()
			showSuccess('Update successfully.')
			fetchUsers()
		} catch (e) {
			// showError('Update failed.')
			console.log('error', e)
		}
	}

	return (
		<>
			<Button
				color={row.status === undefined || !row.status ? 'success' : 'error'}
				onClick={handleUpdateUser}
			>
				{row.status === undefined || !row.status ? 'Active' : 'Deactive'}
			</Button>
			
		</>
	)
}
