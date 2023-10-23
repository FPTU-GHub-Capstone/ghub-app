import React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

import { NavItemProps } from './types' // Import the type from the types file
import * as styles from './styles'


const scrollToSection = (sectionId: string) => {
	const section = document.getElementById(sectionId)
	if (section) {
		const sectionOffset = section.getBoundingClientRect().top
		const navbarHeight = document.querySelector('nav')?.clientHeight || 0
		const targetScrollTop = sectionOffset + window.scrollY - navbarHeight

		window.scrollTo({
			top: targetScrollTop,
			behavior: 'smooth',
		})
	}
}

const NavItem: React.FC<NavItemProps> = ({ text, sectionId }) => {
	return (
		<li style={styles.liStyle}>
			<Typography variant="button">
				<Link to='/' onClick={() => scrollToSection(sectionId)} style={styles.linkStyle}>
					{text}
				</Link>
			</Typography>
		</li>
	)
}

export default NavItem
