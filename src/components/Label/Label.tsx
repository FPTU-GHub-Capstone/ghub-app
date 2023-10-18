import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

import { StyledLabel } from './styles'


type Props = {
	children: JSX.Element | string,
	startIcon?: JSX.Element,
	endIcon?: JSX.Element,
	color?: string,
	variant?: string,
	sx?: Record<string, any>,
}

const Label = ({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }: Props) => {
	const theme = useTheme()

	const iconStyle = {
		width: 16,
		height: 16,
		'& svg, img': { width: 1, height: 1, objectFit: 'cover' },
	}

	return (
		<StyledLabel
			component="span"
			ownerState={{ color, variant }}
			sx={{
				...(startIcon && { pl: 0.75 }),
				...(endIcon && { pr: 0.75 }),
				...sx,
			}}
			theme={theme}
			{...other}
		>
			{startIcon && <Box sx={{ mr: 0.75, ...iconStyle }}> {startIcon} </Box>}

			{children}

			{endIcon && <Box sx={{ ml: 0.75, ...iconStyle }}> {endIcon} </Box>}
		</StyledLabel>
	)
}


export default Label
