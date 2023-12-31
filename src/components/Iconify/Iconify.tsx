import React from 'react'
import { Icon } from '@iconify/react'
import { IconifyIcon } from '@iconify/types'
import { Box } from '@mui/material'


type Props = {
	icon: IconifyIcon | string,
	width?: number | string,
	sx?: Record<string, unknown>,
}

const Iconify = ({ icon, width = 20, sx, ...other }: Props) => {
	return (
		<Box component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
	)
}

export default Iconify
