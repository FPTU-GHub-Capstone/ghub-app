import { NavLink as RouterLink } from 'react-router-dom'
import { Box, List, ListItemText } from '@mui/material'


import { NavItem as NavItemProps } from '../../common'

import { StyledNavItem, StyledNavItemIcon } from './styles'


type Props = {
	data: Array<NavItemProps>,
	isOpen: boolean,
	sx?: Record<string, unknown>,
}

export default function NavSection({ data, sx, isOpen, ...other }: Props) {
	return (
		<Box {...other}>
			<List disablePadding sx={{ p: 1 }}>
				{data.map((item) => (
					<NavItem key={item.title} item={item} sx={sx} isOpen={isOpen} />
				))}
			</List>
		</Box>
	)
}

function NavItem({ item, sx, isOpen }: {
	key: string, 
	item: NavItemProps,
	isOpen: boolean,
	sx?: Record<string, unknown>,
}) {
	const { title, path, icon, info } = item

	return (
		<StyledNavItem
			component={RouterLink}
			to={path}
			sx={{
				...sx,
				'&.active': {
					color: 'common.white',
					bgcolor: 'primary.dark',
					fontWeight: 'fontWeightBold',
				},
			}}
		>
			<StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

			<ListItemText disableTypography primary={title} sx={{ opacity: isOpen ? 1 : 0 }} />

			{info && info}
		</StyledNavItem>
		
	)
}
