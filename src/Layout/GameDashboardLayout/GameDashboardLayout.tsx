import Header from '../DashboardLayout/Header'

import * as Styled from './styles'
import Navbar from './Navbar'


type Props = {
	title: string,
	children: JSX.Element,
}
export default function DashboardLayout({ children }: Props) {

	return (
		<Styled.StyledRoot>
			<Header isOpen={true} />

			{/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}
			
			<Navbar />

			<Styled.Main>
				
				{children}
			</Styled.Main>
		</Styled.StyledRoot>
	)
}
