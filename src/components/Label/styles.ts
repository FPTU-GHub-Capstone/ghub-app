import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';


type Props = {
	ownerState: Record<string,any>,
	theme?: any,
}

export const StyledLabel = styled(Box)(({ theme, ownerState }: Props) => {
	const isLight = theme.palette.mode === 'light';

	const isFilledVariant = ownerState.variant === 'filled';

	const isOutlinedVariant = ownerState.variant === 'outlined';

	const isSoftVariant = ownerState.variant === 'soft';

	const defaultStyle = {
		...(ownerState.color === 'default' && {
			// OUTLINED
			...(isOutlinedVariant && {
				backgroundColor: 'transparent',
				color: theme.palette.text.primary,
				border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
			}),
			// SOFT
			...(isSoftVariant && {
				color: isLight ? theme.palette.text.primary : theme.palette.common.white,
				backgroundColor: alpha(theme.palette.grey[500], 0.16),
			}),
		}),
	};

	const colorStyle = {
		...(ownerState.color !== 'default' && {
			// FILLED
			...(isFilledVariant && {
				color: theme.palette[ownerState.color].contrastText,
				backgroundColor: theme.palette[ownerState.color].main,
			}),
			// OUTLINED
			...(isOutlinedVariant && {
				backgroundColor: 'transparent',
				color: theme.palette[ownerState.color].main,
				border: `1px solid ${theme.palette[ownerState.color].main}`,
			}),
			// SOFT
			...(isSoftVariant && {
				color: theme.palette[ownerState.color][isLight ? 'dark' : 'light'],
				backgroundColor: alpha(theme.palette[ownerState.color].main, 0.16),
			}),
		}),
	};

	return {
		height: 24,
		minWidth: 22,
		lineHeight: 0,
		borderRadius: 6,
		cursor: 'default',
		alignItems: 'center',
		whiteSpace: 'nowrap',
		display: 'inline-flex',
		justifyContent: 'center',
		textTransform: 'capitalize',
		padding: theme.spacing(0, 1),
		color: theme.palette.grey[800],
		fontSize: theme.typography.pxToRem(12),
		fontFamily: theme.typography.fontFamily,
		backgroundColor: theme.palette.grey[300],
		fontWeight: theme.typography.fontWeightBold,
		...colorStyle,
		...defaultStyle,
	};
});
