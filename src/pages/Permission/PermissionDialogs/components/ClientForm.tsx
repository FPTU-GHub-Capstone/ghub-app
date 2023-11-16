import React, { useState } from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, FormControlLabel, Checkbox } from '@mui/material'
import { useForm } from 'react-hook-form'
import { faker } from '@faker-js/faker'

import InputField from '../../../../components/TextFields/InputField'
import { initScopes } from '../../../../mock/permissions'
import { EntityName, convertEntityNameToLabel } from '../../../../common'


type ClientFormType = {
	gameId: string,
	clientId: string,
	clientSecret: string,
	scopes: string,
}

const TablePermission = ({ permissionList, handleSelectAction }: {
	permissionList: Record<string, boolean[]>,
	handleSelectAction: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) => {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Entity</TableCell>
					<TableCell>Read</TableCell>
					<TableCell>Create</TableCell>
					<TableCell>Update</TableCell>
					<TableCell>Delete</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{Object.entries(permissionList).map(([entityName, actions], index) => (
					<TableRow key={index}>
						<TableCell>{convertEntityNameToLabel(entityName)}</TableCell>
						{actions.map((action, i) => (
							<TableCell key={i}>
								<FormControlLabel
									control={
										<Checkbox
											size="small"
											checked={action}
											onChange={(event) => handleSelectAction(event)}
											name={`${entityName}-${i}`}
										/>
									}
									label=''
								/>
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default function ClientForm() {
	const form = useForm<ClientFormType>({
		mode: 'onChange',
		defaultValues: {
			gameId: faker.string.uuid(),
			clientId: faker.string.uuid(),
			clientSecret: ''
		}
	})
	const { watch, register, handleSubmit, formState: { errors }, control } = form
	const [permissionList, setPermissionList] = useState(initScopes)

	const handleSelectAction = (event: React.ChangeEvent<HTMLInputElement>) => {
		const entity = event.target.name.split('-')
		const entityName = entity[0] as EntityName
		const actionIndex = entity[1]
		const list = {...permissionList}

		list[entityName][actionIndex] = event.target.checked
		// console.log(`@permission:: ${JSON.stringify(list)}`)
		// console.log(`@permission:: ${entityName} - ${actionIndex}`)
		

		setPermissionList(list)
	}

	const onSubmit = (data: ClientFormType) => {
		console.log({ ...data })
	}
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			margin: 5
		}}
		component='form'
		onSubmit={handleSubmit(onSubmit)}
		>
			<InputField
				disabled
				errors={errors}
				register={register}
				name='gameId'
				label='Game ID'
				size='small'
			/>

			<InputField
				disabled
				errors={errors}
				register={register}
				name='clientId'
				label='Client ID'
				size='small'
			/>

			<InputField
				errors={errors}
				register={register}
				name='clientSecret'
				label='Client Secret'
				size='small'
			/>

			<TablePermission 
				permissionList={permissionList} 
				handleSelectAction={(event) => handleSelectAction(event)} 
			/>

		</Box>
	)
}
