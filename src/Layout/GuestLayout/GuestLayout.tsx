import { Navbar } from './Navbar'


type Props = {
	children: JSX.Element,
}

export default function GuestLayout({ children }: Props) {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}
