/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, FormControlLabel, Checkbox, InputAdornment, IconButton, Grid, TableContainer } from '@mui/material'
import { useForm } from 'react-hook-form'
import { LoopOutlined } from '@mui/icons-material'

import InputField from '../../../../components/TextFields/InputField'
import { initScopes } from '../../../../mock/permissions'
import { EntityName, convertEntityNameToLabel } from '../../../../common'
import { generateClientId, generateClientSecret } from '../../../../utils/generator'


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
		<TableContainer sx={{ maxHeight: '35vw', borderColor: 'gray'}}>
			<Table stickyHeader >
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
		</TableContainer>
		
	)
}

export default function ClientForm() {
	const form = useForm<ClientFormType>({
		mode: 'onChange',
		defaultValues: {
			clientId: generateClientId(),
			clientSecret: generateClientSecret(),
		}
	})
	const { watch, register, handleSubmit, formState: { errors }, control, setValue } = form
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

	const handleChangeClientId = () => {
		setValue('clientId', generateClientId())
	}

	const handleChangeClientSecret = () => {
		setValue('clientSecret', generateClientSecret())
	}

	const onSubmit = (data: ClientFormType) => {
		console.log({ ...data })
	}

	return (
		<Grid container>
			<Grid item xs={4} sx={{margin: 5}}>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				>
					<InputField
						errors={errors}
						register={register}
						name='clientName'
						label='Client Name'
						size='small'
					/>

					<InputField
						disabled
						errors={errors}
						register={register}
						name='clientId'
						label='Client ID'
						size='small'
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={handleChangeClientId}
									edge="end"
								>
									<LoopOutlined />
								</IconButton>
							</InputAdornment>
						}
					/>

					<InputField
						disabled
						errors={errors}
						register={register}
						name='clientSecret'
						label='Client Secret'
						size='small'
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={handleChangeClientSecret}
									edge="end"
								>
									<LoopOutlined />
								</IconButton>
							</InputAdornment>
						}
					/>
				</Box>
			</Grid>
			<Grid item xs={6} sx={{margin: 5}}>
				<TablePermission 
					permissionList={permissionList} 
					handleSelectAction={(event) => handleSelectAction(event)} 
				/>
			</Grid>
		</Grid>
		
	)
}
