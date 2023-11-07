import { Fragment, ReactNode } from 'react'
import { styled, useMediaQuery, useTheme } from '@mui/material'


interface IFooterIllustrationsProp {
	image?: ReactNode;
}

const MaskImg = styled('img')(() => ({
	bottom: 0,
	zIndex: -1,
	width: '100%',
	position: 'absolute'
}))

const TreeImg = styled('img')(({ theme }) => ({
	left: '2.25rem',
	bottom: '4.25rem',
	position: 'absolute',
	[theme.breakpoints.down('lg')]: {
		left: 0,
		bottom: 0
	}
}))

const FooterIllustrations = (props: IFooterIllustrationsProp) => {
	const { image } = props
	const theme = useTheme()
	const isHidden = useMediaQuery(theme.breakpoints.down('md'))

	if (!isHidden) {
		return (
			<Fragment>
				{image || <TreeImg alt='tree' src='/assets/images/pages/tree-2.png' />}
				<MaskImg alt='mask' src={'/assets/images/pages/misc-mask-light.png'} />
			</Fragment>
		)
	} else {
		return null
	}
}

export default FooterIllustrations
