import * as React from 'react'
import { Box, Typography, AppBar, Toolbar, IconButton, Tabs, Tab } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useParams } from 'react-router'

import { Games as GamesComponent } from '../../../pages/Games'
import NavSection from '../../../components/NavSession'
import { sidebarItems } from '../../DashboardLayout/Sidebar/Items'

import { NavbarItems } from './Items'


export default function Navbar() {
	const { gameId } = useParams<{ gameId: string }>()
	const navbarItem = NavbarItems(gameId)

	return (
		<>
			<Box sx={{display: 'flex', flexDirection: 'column', width: 200}}>
				<Box sx={{px: 2.5, pt: 5, pb: 2, textAlign: 'center'}}>
					<Box
						component='img'
						src='/assets/images/covers/cover_3.jpg'
						sx={{ width: 50, height: 50, cursor: 'pointer' }}
					/>
					<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
						Sword Art Online: Infinity Moment
					</Typography>
				</Box>
				<Divider />

				<NavSection
					data={navbarItem}
					isOpen={true}
					sx={{ 
						paddingRight: 3, 
						'&.active': {
							color: 'common.white',
							bgcolor: 'primary.dark',
							fontWeight: 'fontWeightBold',
						},
					}}
				/>
			</Box>

			
			<Divider orientation="vertical" flexItem />
		</>

	)
}
