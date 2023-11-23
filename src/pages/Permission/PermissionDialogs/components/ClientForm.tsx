/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, FormControlLabel, Checkbox, InputAdornment, IconButton, Grid, TableContainer, Button } from '@mui/material'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, useForm } from 'react-hook-form'
import { LoopOutlined } from '@mui/icons-material'

import InputField from '../../../../components/TextFields/InputField'
import { initScopes } from '../../../../mock/permissions'
import { ACCESS_TOKEN, Client, EntityName, RequestHeaders, convertEntityNameToLabel } from '../../../../common'
import { generateClientId, generateClientSecret } from '../../../../utils/generator'



type ClientFormType = {
	errors: FieldErrors<Client>,
	register: UseFormRegister<Client>,
	setValue: UseFormSetValue<Client>,
	permissionList: Record<string, boolean[]>,
	setPermissionList: React.Dispatch<React.SetStateAction<any>>,
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
												name={`${entityName}:${i}`}
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

export default function ClientForm({
	errors, 
	register, 
	setValue, 
	permissionList, 
	setPermissionList
}: ClientFormType) {

	const handleSelectAction = (event: React.ChangeEvent<HTMLInputElement>) => {
		const entity = event.target.name.split(':')
		const entityName = entity[0] as EntityName
		const actionIndex = entity[1]

		permissionList[entityName][actionIndex] = event.target.checked
		setPermissionList({...permissionList})
	}

	const handleChangeClientId = () => {
		setValue('clientId', generateClientId())
	}

	const handleChangeClientSecret = () => {
		setValue('clientSecret', generateClientSecret())
	}

	return (
		<Grid container>
			<Grid item xs={4} padding={5}>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
				component='form' 
				>
					<InputField
						errors={errors}
						register={register}
						name='name'
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
			<Grid item xs={8} padding={5}>
				<TablePermission 
					permissionList={permissionList} 
					handleSelectAction={(event) => handleSelectAction(event)} 
				/>
			</Grid>
		</Grid>
		
	)
}
