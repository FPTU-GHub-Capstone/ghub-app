import { Button } from '@mui/material'


export function AssetTypeAddBtn({ handleOnClick }: { handleOnClick: () => void }) {
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
			Add an Asset Type
		</Button>
	)
}

