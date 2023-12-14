import { useState } from 'react'

import Header from './Header'
import * as Styled from './styles'
import Sidebar from './Sidebar'


type Props = {
	title: string,
	children: JSX.Element,
}
export default function DashboardLayout({ children }: Props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Styled.StyledRoot>
			<Header isOpen={isOpen} />

			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

			<Styled.Main>
				{children}
			</Styled.Main>
		</Styled.StyledRoot>
	)
}
