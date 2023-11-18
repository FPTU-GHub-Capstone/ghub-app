import { Dialog, Drawer, Slide } from '@mui/material'
import React from 'react'

import Header from './components/Header'
import ClientForm from './components/ClientForm'


type Props = {
	isOpenUpdate: boolean,
	handleCloseUpdate: () => void,
}

const Transition = React.forwardRef(function Transition(
	props: {
		children: React.ReactElement,
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function UpdateClient({isOpenUpdate, handleCloseUpdate}: Props) {
	return (
		<Dialog
			fullScreen
			open={isOpenUpdate}
			onClose={handleCloseUpdate}
			TransitionComponent={Transition}
		>
			{/* <Header titleDialog='Update Client' titleBtn='Save' handleCloseDialog={handleCloseUpdate} />

			<ClientForm /> */}

		</Dialog>
	)
}
