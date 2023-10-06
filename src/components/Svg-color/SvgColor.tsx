import { Box } from '@mui/material'


type Props = {
	src: string,
	sx?: Record<string, unknown>,
}

const SvgColor = ({ src, sx, ...other }: Props) => {
	return (
		<Box
			component="span"
			className="svg-color"
			sx={{
				width: 24,
				height: 24,
				display: 'inline-block',
				bgcolor: 'currentColor',
				mask: `url(${src}) no-repeat center / contain`,
				WebkitMask: `url(${src}) no-repeat center / contain`,
				...sx,
			}}
			{...other}
		/>
	)
}

export default SvgColor
