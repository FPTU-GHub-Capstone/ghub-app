
import React from 'react'
import { Button } from '@mui/material'

import { RestService } from '../../../../services/RestService'
import config from '../../../../config'
import { useAppDispatch } from '../../../../redux/hook'
import { usersFetch } from '../../../../redux/slices/userSlide'
import { useDialog } from '../../../../hooks/useDialog'
import { showSuccess } from '../../../../utils/toast'
import ConfirmDialog from '../../../../components/ConfirmDialog'
import { HttpStatusCode } from '../../../../common'


const resetService = RestService.getInstance()
export default function GridAction({ row }: any) {
	const dispatch = useAppDispatch()
	const [isOpenUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()

	const fetchUsers = async () => {
		const pathSegments = location.pathname.split('/')
		const extractedGameId = pathSegments[pathSegments.indexOf('games') + 1]
		dispatch(usersFetch(extractedGameId))
	}

	const handleUpdateUser = async () => {
		try {
			const { status } = await resetService.put(
				config.IDP_URL + `/users/${row.uid}/update-status`,
				{
					status: row.status === undefined || row.status ? false : true,
				},
			)
			// handleOpenSuccessSnack()
			if(status == HttpStatusCode.SUCCESS) {
				showSuccess('Update successfully.')
				handleCloseUpdate()
				fetchUsers()
			}
		} catch (e) {
			// showError('Update failed.')
			console.log('error', e)
		}
	}

	return (
		<>
			<Button
				color={row.status === undefined || !row.status ? 'success' : 'error'}
				onClick={handleOpenUpdate}
			>
				{row.status === undefined || !row.status ? 'Active' : 'Inactive'}
			</Button>
			
			<ConfirmDialog
				open={isOpenUpdate}
				title={`${row?.status ? 'Inactive' : 'Active'} Game Manager`}
				message={`Are you sure? Do yo really want to ${row?.status ? 'inactive' : 'active'} this game manager?`}
				onCancel={handleCloseUpdate}
				onConfirm={handleUpdateUser}
			/>
		</>
	)
}
