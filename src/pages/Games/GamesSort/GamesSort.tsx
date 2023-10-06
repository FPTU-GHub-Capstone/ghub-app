import { MenuItem, TextField } from '@mui/material'


type Props = {
	options: Array<{value: string, label: string}>,
	onSort?: () => void,
}

export default function GamesSort({ options, onSort }: Props) {
	return (
		<TextField select size="small" value="latest" onChange={onSort}>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	)
}
