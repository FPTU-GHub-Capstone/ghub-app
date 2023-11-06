
type Props = {
	children: JSX.Element,
}

export default function EmptyLayout({ children }: Props) {
	return (
		<>
			{children}
		</>
	)
}
