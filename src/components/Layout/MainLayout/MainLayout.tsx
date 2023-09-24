import React, { ReactElement } from 'react'

import * as Styled from './styles'
import { Header } from './Header'
import { Footer } from './Footer'


interface IProps {
	children: ReactElement;
}

export const MainLayout: React.FC<IProps> = ({ children }) => {
	return (
		<>
			<Header />
			<Styled.BodyWrapper>{children}</Styled.BodyWrapper>
			<Footer />
		</>
	)
}