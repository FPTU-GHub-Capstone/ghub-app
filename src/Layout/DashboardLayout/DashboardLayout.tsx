//import { useState } from 'react'

import Header from './Header'
import * as Styled from './styles'


type Props = {
	title: string,
	children: JSX.Element,
}
export default function DashboardLayout({ children }: Props) {

	return (
		<Styled.StyledRoot>
			<Header isOpen={false} />

			{/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}

			<Styled.Main>
				{children}
			</Styled.Main>
		</Styled.StyledRoot>
	)
}
