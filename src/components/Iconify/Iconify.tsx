import React from 'react'
import { Icon } from '@iconify/react'
import { IconifyIcon } from '@iconify/types'
import { Box } from '@mui/material'


type Props = {
	icon: IconifyIcon | string,
	width?: number | string,
	sx?: object,
}

const Iconify = ({ icon, width = 20, sx, ...other }: Props, ref: React.Ref<unknown>) => {
	return (
		<Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
	)
}

export default Iconify