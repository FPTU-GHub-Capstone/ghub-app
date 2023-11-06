import * as React from 'react'
import { Box, Typography, AppBar, Toolbar, IconButton, Tabs, Tab } from '@mui/material'
import Divider from '@mui/material/Divider'

import { Games as GamesComponent } from '../../../pages/Games'
import NavSection from '../../../components/NavSession'
import { sidebarItems } from '../../DashboardLayout/Sidebar/Items'


export default function Navbar() {

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
					data={sidebarItems.gameManager}
					isOpen={true}
					sx={{ paddingRight: 3 }}
				/>
			</Box>

			
			<Divider orientation="vertical" flexItem />
		</>

	)
}
