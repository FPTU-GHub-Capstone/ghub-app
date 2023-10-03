import { useState } from 'react'

import Header from './Header'
import * as Styled from './styles'
import Sidebar from './Sidebar'


type Props = {
	title: string,
	children: JSX.Element,
}
export default function DashboardLayout({ children, title }: Props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Styled.StyledRoot>
			<Header onOpenNav={() => setIsOpen(true)} />

			<Sidebar openNav={isOpen} onCloseNav={() => setIsOpen(false)} />

			<Styled.Main>
				<p>{title}</p>
				{children}
			</Styled.Main>
		</Styled.StyledRoot>
	)
}
