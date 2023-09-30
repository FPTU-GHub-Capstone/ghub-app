import { NavLink as RouterLink } from 'react-router-dom'
import { Box, List, ListItemText , ListItemIcon, ListItemButton } from '@mui/material'


import { StyledNavItem, StyledNavItemIcon } from './styles'


type NavItemProps = {
	title: string,
	path: string,
	icon: JSX.Element,
	info?: string,
}

type Props = {
	data: Array<NavItemProps>,
}

export default function NavSection({ data, ...other }: Props) {
	return (
		<Box {...other}>
			<List disablePadding sx={{ p: 1 }}>
				{data?.map((item) => (
					<NavItem key={item.title} item={item} />
				))}
			</List>
		</Box>
	)
}

function NavItem({ item }: {
	key: string, 
	item: NavItemProps,
}) {
	const { title, path, icon, info } = item
	console.log('@path::')

	return (
		<StyledNavItem
			component={RouterLink}
			to={path}
			sx={{
				'&.active': {
					color: 'text.primary',
					bgcolor: 'action.selected',
					fontWeight: 'fontWeightBold',
				},
			}}
		>
			<StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

			<ListItemText disableTypography primary={title} />

			{info && info}
		</StyledNavItem>
		
	)
}
