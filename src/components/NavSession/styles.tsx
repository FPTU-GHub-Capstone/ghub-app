// @mui
import { styled } from '@mui/material/styles'
import { ListItemIcon, ListItemButton } from '@mui/material'


type Props = {
	children: Array<JSX.Element | any>,
	sx?: Record<string, unknown>,
	component?: any,
	to?: string,
}

export const StyledNavItem = styled(({ children, sx, ...other }: Props) => 
	<ListItemButton disableGutters sx={sx} {...other}>
		{children}
	</ListItemButton>)(({ theme }) => ({
	...theme.typography.body2,
	height: 48,
	position: 'relative',
	textTransform: 'capitalize',
	color: theme.palette.text.secondary,
	borderRadius: theme.shape.borderRadius,
}))

// export const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
// 	...theme.typography.body2,
// 	height: 48,
// 	position: 'relative',
// 	textTransform: 'capitalize',
// 	color: theme.palette.text.secondary,
// 	borderRadius: theme.shape.borderRadius,
// }))

export const StyledNavItemIcon = styled(ListItemIcon)({
	width: 22,
	height: 22,
	color: 'inherit',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})
