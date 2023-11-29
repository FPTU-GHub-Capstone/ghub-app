import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router'


export function Navbar() {
	const navigate = useNavigate()

	return (
		<AppBar sx={{ position: 'sticky', top: 0, backgroundColor: 'primary.dark', boxShadow: 'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					onClick={() => navigate(-1)}
					aria-label="close"
				>
					<ArrowBack />
				</IconButton>
				<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
					Logging Page
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
