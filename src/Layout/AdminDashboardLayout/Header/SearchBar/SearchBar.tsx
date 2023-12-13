import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material'

import { bgBlur } from '../../../../utils'
import Iconify from '../../../../components/Iconify'


const HEADER_MOBILE = 64
const HEADER_DESKTOP = 92

const StyledSearchbar = styled('div')(({ theme }) => ({
	...bgBlur({ color: theme.palette.background.default }),
	top: 0,
	left: 0,
	zIndex: 99,
	width: '100%',
	display: 'flex',
	position: 'absolute',
	alignItems: 'center',
	height: HEADER_MOBILE,
	padding: theme.spacing(0, 3),
	// boxShadow: theme.customShadows.z8,
	[theme.breakpoints.up('md')]: {
		height: HEADER_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}))

export default function Searchbar() {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<div>
				{!isOpen && (
					<IconButton onClick={handleOpen}>
						<Iconify icon="eva:search-fill" />
					</IconButton>
				)}

				<Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
					<StyledSearchbar>
						<Input
							fullWidth
							disableUnderline
							placeholder="Search…"
							startAdornment={
								<InputAdornment position="start">
									<Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
								</InputAdornment>
							}
							sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
						/>
						<Button variant="contained" onClick={handleClose}>
							Search
						</Button>
					</StyledSearchbar>
				</Slide>
			</div>
		</ClickAwayListener>
	)
}
