import * as React from 'react'
import { Box, Stack, AppBar, Toolbar, IconButton, Tabs, Tab } from '@mui/material'

import { Games as GamesComponent } from '../../../pages/Games'


function samePageLinkNavigation(
	event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
	if (
		event.defaultPrevented ||
		event.button !== 0 || // ignore everything but left-click
		event.metaKey ||
		event.ctrlKey ||
		event.altKey ||
		event.shiftKey
	) {
		return false
	}
	return true
}
  
type LinkTabProps = {
	label?: string,
	href?: string,
}
  
function LinkTab(props: LinkTabProps) {
	return (
		<Tab
			component='a'
			onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
				// Routing libraries handle this, you can remove the onClick handle when using them.
				if (samePageLinkNavigation(event)) {
					event.preventDefault()
				}
			}}
			{...props}
		/>
	)
}

export default function Navbar() {
	const [value, setValue] = React.useState(1)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		// event.type can be equal to focus with selectionFollowsFocus.
		if (event.type !== 'click' || (event.type === 'click' && 
		samePageLinkNavigation(event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,))
		) {
			setValue(newValue)
		}
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				aria-label="navigation for game dashboard"
			>
				<LinkTab href='/dashboard/server' label="Server" />
				<LinkTab href='/dashboard/player' label="Player" />
				<LinkTab href='/dashboard/characters' label="Characters" />
				<LinkTab href='/dashboard/assets' label="Assets" />
			</Tabs>
		</Box>
	)
}
