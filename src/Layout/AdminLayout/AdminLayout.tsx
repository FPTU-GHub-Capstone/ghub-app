//import { useState } from 'react'

import Header from './Header'
import Navbar from './Navbar/Navbar'
import * as Styled from './styles'


type Props = {
	title: string,
	children: JSX.Element,
}
export default function AdminLayout({ children }: Props) {

	return (
		<Styled.StyledRoot>
			<Header isOpen={false} />

			{/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}
			<Navbar />
			<Styled.Main>
				{children}
			</Styled.Main>
		</Styled.StyledRoot>
	)
}
