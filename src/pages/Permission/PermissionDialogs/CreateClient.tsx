import { Dialog, Slide } from '@mui/material'
import React from 'react'

import Header from './components/Header'
import ClientForm from './components/ClientForm'


type Props = {
	isOpenAssignDialog: boolean,
	handleCloseAssignDialog: () => void,
}

const Transition = React.forwardRef(function Transition(
	props: {
		children: React.ReactElement,
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function CreateClient({ isOpenAssignDialog, handleCloseAssignDialog }: Props) {
	return (
		<Dialog
			fullScreen
			open={isOpenAssignDialog}
			onClose={handleCloseAssignDialog}
			TransitionComponent={Transition}
		>
			<Header titleDialog='Create Client' titleBtn='Save' handleCloseDialog={handleCloseAssignDialog} />

			<ClientForm />

		</Dialog>
	)
}
