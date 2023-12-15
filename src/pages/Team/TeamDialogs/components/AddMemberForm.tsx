/* eslint-disable max-lines-per-function */
import { Box, TextField, Button, Grid, Card, Stack, Avatar, Typography, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { EMAIL_REGEX, HttpStatusCode, User } from '../../../../common'
import { getUserByEmail } from '../../../../services/TeamService'
import { showError } from '../../../../utils/toast'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { membersFetch } from '../../../../redux/slices/teamSlide'
import Label from '../../../../components/Label'


const MemberPermission = ({ member, permission, handleSelectPermission }: { 
	member: User,
	permission: boolean[],
	handleSelectPermission: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) => {
	return (
		<Card variant="outlined" sx={{ padding: 2, marginTop: 3 }}>
			<Stack direction="row" alignItems="center" spacing={2} mb={3}>
				<Avatar alt={member?.name ?? member?.username} src={member?.picture} />
				<Typography variant="subtitle2" noWrap>
					{member?.name ?? member?.username}
				</Typography>
			</Stack>

			<Stack direction="row" alignItems="center" spacing={1}>
				<Label color='success' sx={{marginRight: 1}}>
					<FormControlLabel
						control={
							<Checkbox
								size="small"
								color='warning'
								disabled
								defaultChecked
								name='0'
							/>
						}
						label='get'
					/>
				</Label>
				<Label color='warning' sx={{marginRight: 1}}>
					<FormControlLabel
						control={
							<Checkbox
								size="small"
								color='warning'
								checked={permission[1]}
								onChange={(event) => handleSelectPermission(event)}
								name='1'
							/>
						}
						label='update'
					/>
				</Label>
				<Label color='error' sx={{marginRight: 1}}>
					<FormControlLabel
						control={
							<Checkbox
								size="small"
								color='error'
								checked={permission[2]}
								onChange={(event) => handleSelectPermission(event)}
								name='2'
							/>
						}
						label='delete'
					/>
				</Label>
			</Stack>

			
		</Card>
	)
}

export default function AddMemberForm({members, setMembers, permission, setPermission} : {
	members: User[],
	setMembers: React.Dispatch<React.SetStateAction<User[]>>,
	permission: boolean[],
	setPermission: React.Dispatch<React.SetStateAction<boolean[]>>,
}) {
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
	// const members: User[] = []
	

	const currentMembers = useAppSelector(({ team }) => team.memberList)

	useEffect(() => {
		dispatch(membersFetch(gameId))
		// console.log(`@members:: ${members}`)
	}, [dispatch, gameId])

	const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
		const response = await getUserByEmail(data.email.toLowerCase())
		if (response.data.users.length == 0) showError('This email does not exist in the system')
		if (response.status == HttpStatusCode.SUCCESS) {
			currentMembers.forEach((member) => {
				if (member.email == response.data.users[0].email) {
					showError('This person is already a member of the team')
					return
				}
			})
			// members.forEach((member) => {
			// 	if (member.email == response.data.users[0].email) return
			// })
			setMembers((prevMem) => [response.data.users[0]])
			// members.push(response.data.users[0])
			// console.log(members[0])
		}
	}

	const handleSelectPermission = (event: React.ChangeEvent<HTMLInputElement>) => {
		const index = event.target.name

		permission[index] = event.target.checked
		setPermission({...permission})
		console.log(permission)
	}

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
		}}
		component='form'
		padding={5}
		>
			<Grid container spacing={1} sx={{ alignItems: 'center', textAlign: 'center' }}>
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

			{members && members.map((member, index) => (
				<MemberPermission key={index} 
					member={member} 
					permission={permission}
					handleSelectPermission={handleSelectPermission} 
				/>
			))}

		</Box>
	)
}
