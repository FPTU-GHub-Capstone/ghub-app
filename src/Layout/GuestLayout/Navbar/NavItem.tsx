// NavItem.tsx
import React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom' // Import useNavigate and useMatch

import * as styles from './styles'


interface INavItemProps {
	text: string;
	sectionId: string;
}

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

const NavItem: React.FC<INavItemProps> = ({ text, sectionId }) => {
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
