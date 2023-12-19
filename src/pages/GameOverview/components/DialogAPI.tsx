import { Box, Dialog } from '@mui/material'
import { useParams } from 'react-router-dom'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

import DialogHeader from '../../../components/DialogHeader'
import swaggerJson from '../swagger.json'
import config from '../../../config'


function updateIdsInPaths(id: string) {
	const updatedPaths = {}

	for (const path in swaggerJson.paths) {
		if (Object.prototype.hasOwnProperty.call(swaggerJson.paths, path)) {
			const updatedPath = path.replace(/{id}/g, id)
			const pathDetails = swaggerJson.paths[path]

			if (pathDetails.get || pathDetails.post || pathDetails.put || pathDetails.delete) {
				['get', 'post', 'put', 'delete'].forEach(method => {
					if (pathDetails[method]) {
						const parameters = pathDetails[method].parameters || []
						pathDetails[method].parameters = parameters.map(parameter => {
							if (parameter.name === 'id' && parameter.in === 'path') {
								parameter.schema.default = id
								delete parameter.required
							}
							return parameter
						})
					}
				})
			}

			updatedPaths[updatedPath] = pathDetails
		}
	}
	swaggerJson.servers = [{
		url: config.GMS_URL.split('/gms')[0],
		description: 'Production server URL'
	}]

	return {
		...swaggerJson,
		paths: updatedPaths,
	}
}

type Props = {
	isOpenAPIDialog: boolean,
	handleCloseAPIDialog: () => void,
};

export default function DialogAPI({
	isOpenAPIDialog,
	handleCloseAPIDialog,
}: Props) {
	const { gameId } = useParams()
	const updatedSwaggerJson = updateIdsInPaths( gameId )
	
	return (
		<Dialog fullScreen open={isOpenAPIDialog} onClose={handleCloseAPIDialog}>
			<Box>
				<DialogHeader
					titleDialog='Your Game API'
					titleBtn='Close'
					handleCloseDialog={handleCloseAPIDialog}
					enableBtn={false}
				/>

				<SwaggerUI spec={updatedSwaggerJson} />
			</Box>
		</Dialog>
	)
}
