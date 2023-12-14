/* eslint-disable max-lines-per-function */
import { Box, TextField, Button, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { EMAIL_REGEX, HttpStatusCode, User } from '../../../../common'
import { getUserByEmail } from '../../../../services/TeamService'
import { showError } from '../../../../utils/toast'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { membersFetch } from '../../../../redux/slices/teamSlide'


export default function AddMemberForm() {
	const dispatch = useAppDispatch()
	const { gameId } = useParams()
	const form = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
		}
	})
	const { watch, register, handleSubmit, formState, control } = form
	const { errors } = formState
	const members: User[] = []
	
	const currentMembers = useAppSelector(({ team }) => team.memberList)

	useEffect(() => {
		dispatch(membersFetch(gameId))
		// console.log(`@members:: ${members}`)
	}, [dispatch, gameId])

	const onSubmit: SubmitHandler<{email: string}> = async (data) => {
		const response = await getUserByEmail(data.email.toLowerCase())
		if(response.data.users.length == 0 ) showError('This email does not exist in the system')
		if(response.status == HttpStatusCode.SUCCESS) {
			currentMembers.forEach((member) => {
				if(member.email == response.data.users[0].email) {
					showError('This person is already a member of the team')
					return
				}
			})
			members.forEach((member) => {
				if(member.email == response.data.users[0].email) return
			})
			members.push(response.data.users[0])
		}
	}

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
		}}
		component='form' 
		padding={5}
		>
			<Grid container spacing={1} sx={{alignItems: 'center', textAlign: 'center'}}>
				<Grid item xs={9} >
					<TextField
						id="email-input"
						label="Email Address"
						variant="outlined"
						// margin="normal"
						type="email"
						size='small'
						fullWidth
						{...register('email', {
							required: 'Email is Required',
							pattern: {
								value: EMAIL_REGEX,
								message: 'Not a valid email address',
							},
						})}
						error={Boolean(errors.email)}
						helperText={errors.email?.message ? String(errors.email.message) : ''}
					/>
				</Grid>
				<Grid item xs={3}>
					<Button
						variant="outlined" 
						size="large"
						fullWidth
						sx={{ 
							borderColor: 'secondary.light',
							marginLeft: 0,
							color: 'secondary.dark',
							'&:hover': {
								backgroundColor: 'secondary.lighter',
								borderColor: '#fff',
							}
						}} 
						onClick={handleSubmit(onSubmit)}
					>
					Add
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
}
