import { Tooltip } from '@mui/material'
import { Edit, Delete, Download } from '@mui/icons-material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { jwtDecode } from 'jwt-decode'
import { useMemo } from 'react'

import { useDialog } from '../../../../hooks/useDialog'
import UpdatePermission from '../../PermissionDialogs/UpdateClient'
import { ACCESS_TOKEN, Client, GAME_ID, HttpStatusCode, UserTokenPayload } from '../../../../common'
import { deleteClient } from '../../../../services/ClientService'
import { useAppDispatch } from '../../../../redux/hook'
import { clientsFetch } from '../../../../redux/slices/clientSlice'
import ConfirmDialog from '../../../../components/ConfirmDialog'
import { RestService } from '../../../../services/RestService'
import config from '../../../../config'


type DownLoadFile = {
	data: string, 
	fileName: string, 
	fileType: string,
}

function isHasUpdatedGamePermission(decoded: UserTokenPayload): boolean {
	const currentGameId = localStorage.getItem(GAME_ID)
	return decoded.scp.includes('games:*:update') || decoded.scp.includes(`games:${currentGameId}:update`)
}

function downloadFile({ data, fileName, fileType }: DownLoadFile){
	const blob = new Blob([data], { type: fileType })
	const a = document.createElement('a')
	a.download = fileName
	a.href = window.URL.createObjectURL(blob)
	const clickEvt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
	})
	a.dispatchEvent(clickEvt)
	a.remove()
}

export default function GridAction({rowData: client}: {rowData: Client}) {
	const [isOpenUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()
	const [isOpenDelete, handleOpenDelete, handleCloseDelete] = useDialog()
	const dispatch = useAppDispatch()
	const accessToken = localStorage.getItem(ACCESS_TOKEN)
	const decoded = useMemo<UserTokenPayload>(() => {
		return jwtDecode(accessToken)
	}, [accessToken])
	
	const handleDeleteClient = async() => {
		const { status } = await deleteClient(client.clientId)
		if(status == HttpStatusCode.NO_CONTENT) {
			dispatch(clientsFetch())
			handleCloseDelete()
		}
	}

	const handleDownLoadClient = async() => {
		const privateClient = await RestService.getInstance().get<Client>(
			`${config.IDP_URL}/clients/${client.clientId}`
		)
		downloadFile({
			data: JSON.stringify(privateClient.data, undefined, 4),
			fileName: `client-${client.clientId}.json`,
			fileType: 'text/json',
		})
	}

	return (
		<>
			<GridActionsCellItem
				key="edit"
				icon={<Tooltip title="Edit"><Edit /></Tooltip>}
				label="Edit"
				className="textPrimary"
				onClick={handleOpenUpdate}
				color="inherit"
			/>
			<GridActionsCellItem
				key="delete"
				icon={<Tooltip title="Delete"><Delete /></Tooltip>}
				label="Delete"
				onClick={handleOpenDelete}
				color="inherit"
			/>
			{isHasUpdatedGamePermission(decoded) && <GridActionsCellItem
				key="download"
				icon={<Tooltip title="Download"><Download /></Tooltip>}
				label="download"
				onClick={handleDownLoadClient}
				color="inherit"
			/>}

			{isOpenUpdate && 
				<UpdatePermission 
					data={client}
					isOpenUpdate={isOpenUpdate}
					handleCloseUpdate={handleCloseUpdate}
				/>
			}

			<ConfirmDialog 
				open={isOpenDelete}
				title="Delete Client"
				message="Are you sure? Do yo really want to delete this client. This
				process can not be undone."
				onCancel={handleCloseDelete}
				onConfirm={handleDeleteClient}
			/>
		</>
	)
}
