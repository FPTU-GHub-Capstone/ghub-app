import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Link, useMatch } from 'react-router-dom' 

import LoginButton from './LoginButton'
import NavItem from './NavItem'

import logo from '/assets/logo.svg'

import * as styles from './styles'
import { NavItemProps } from './types'


const navigationItems: NavItemProps[] = [
	{ text: 'Home', sectionId: 'landing-main' },
	{ text: 'Why Choose Us', sectionId: 'landing-why-choosing-us' },
	{ text: 'Contact Us', sectionId: 'contact-us-form' },
]

export const Navbar: React.FC = () => {
	useEffect(() => {
		const navbarHeight = document.querySelector('nav')?.clientHeight || 0
		document.body.style.paddingTop = navbarHeight - 1 + 'px'
	}, [])

	const isAtRoot = useMatch('/')

	return (
		<nav style={styles.navbarStyle}>
			<div style={styles.divLogoStyle}>
				<img src={logo} alt="GHUB Logo" />

				<Typography sx={styles.textLogoStyle}>
					<Link to="/" style={styles.linkStyle}>
						GHUB
					</Link>
				</Typography>
			</div>
			{isAtRoot && (
				<ul style={styles.ulStyle}>
					{navigationItems.map((item, index) => (
						<NavItem key={index} text={item.text} sectionId={item.sectionId} />
					))}
					<li>
						<form>
							<LoginButton text="Sign in" />
						</form>
					</li>
				</ul>
			)}
		</nav>
	)
}
