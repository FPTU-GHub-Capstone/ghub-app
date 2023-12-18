import { Button } from '@mui/material'


export function ActivityTypeAddBtn({ handleOnClick }: { handleOnClick: () => void }) {
	return (
		<Button
			variant="contained"
			size="large"
			sx={{
				backgroundColor: 'primary.light',
				'&:hover': {
					backgroundColor: 'primary.main',
				},
			}}
			onClick={handleOnClick}
		>
			Add an Activity Type
		</Button>
	)
}

