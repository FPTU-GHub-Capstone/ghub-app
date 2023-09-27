import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import * as Styled from './styles'
import Nav from './Nav'


export default function DashboardLayout() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Styled.StyledRoot>
			<Header onOpenNav={() => setIsOpen(true)} />

			<Nav openNav={isOpen} onCloseNav={() => setIsOpen(false)} />

			<Styled.Main>
				<Outlet />
			</Styled.Main>
		</Styled.StyledRoot>
	)
}
