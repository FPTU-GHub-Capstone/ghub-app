import React from 'react'


type Props = {
	title: string,
}
export const Dashboard = ({ title }: Props) => {
	return (
		<>
			<div>{title}</div>
		</>
	)
}