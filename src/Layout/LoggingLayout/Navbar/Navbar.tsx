import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { ArrowBack, Close } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'


export function Navbar() {
	const navigate = useNavigate()

	const handleButtonClick = () => {
		if (window.history.length <= 1 ) {
			window.close()
		} else {
			navigate(-1)
		}
	}

	const isNewTab = window.history.length <= 1
	return (
		<AppBar
			sx={{
				position: 'absolute',
				top: 0,
				backgroundColor: 'primary.dark',
				boxShadow: 'none',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
		>
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					onClick={handleButtonClick}
					aria-label="navigate-back"
				>
					{isNewTab ? <Close /> : <ArrowBack />}
				</IconButton>
				<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
					Logging Page
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
