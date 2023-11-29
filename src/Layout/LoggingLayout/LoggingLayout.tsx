import { Navbar } from './Navbar'


type Props = {
	children: JSX.Element,
}

export default function LoggingLayout({ children }: Props) {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}
