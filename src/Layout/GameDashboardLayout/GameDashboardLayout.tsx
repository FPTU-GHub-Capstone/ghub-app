import { useState } from 'react'

import Header from '../DashboardLayout/Header'
import Sidebar from '../DashboardLayout/Sidebar'

import * as Styled from './styles'
import Navbar from './Navbar'


type Props = {
	title: string,
	children: JSX.Element,
}
export default function DashboardLayout({ children, title }: Props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Styled.StyledRoot>
			<Header isOpen={isOpen} isOpenGameDashboard={true} />

			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			
			<Navbar />

			<Styled.Main>
				
				{children}
			</Styled.Main>
		</Styled.StyledRoot>
	)
}
