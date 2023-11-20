import { Button } from '@mui/material'


export const LevelSaveBtn = ({ handleOnClick, isDataChanged }: { handleOnClick: () => void, isDataChanged: boolean }) => {
	return (
		<Button
			variant="contained"
			size="large"
			sx={{
				backgroundColor: 'secondary.light',
				'&:hover': {
					backgroundColor: 'secondary.main',
				},
				marginLeft: '10px'
			}}
			onClick={handleOnClick}
			disabled={Boolean(!isDataChanged)}
		>
			Save Current State
		</Button>
	)
}
