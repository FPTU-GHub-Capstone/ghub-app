import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'


type HeaderProps = {
	titleDialog: string,
	titleBtn: string,
	enableBtn?: boolean,
	handleCloseDialog: () => void,
}

export default function DialogHeader({ titleDialog, titleBtn, handleCloseDialog, enableBtn }: HeaderProps) {
	return (
		<AppBar sx={{ position: 'sticky', top: 0, backgroundColor: 'primary.dark', boxShadow: 'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					onClick={handleCloseDialog}
					aria-label="close"
				>
					<CloseIcon />
				</IconButton>
				<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
					{titleDialog}
				</Typography>
				{enableBtn === undefined || enableBtn ? (
					<Button
						size='large'
						type='submit'
						sx={{
							backgroundColor: 'secondary.main',
							color: 'white',
							'&:hover': {
								backgroundColor: 'secondary.dark',
							},
						}}
					>
						{titleBtn}
					</Button>
				) : null}
			</Toolbar>
		</AppBar>
	)
}
