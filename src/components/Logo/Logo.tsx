import { Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'


type Props = {
	disabledLink?: boolean,
	sx?: object,
}

const Logo = ({ disabledLink = false, sx, ...other }: Props) => {
	const logo = (
		<Box
			component='img'
			src='/assets/logo.svg'
			sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
		/>
	)

	if (disabledLink) {
		return <>{logo}</>
	}
    
	return (
		<Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
			{logo}
		</Link>
	)
}

export default Logo