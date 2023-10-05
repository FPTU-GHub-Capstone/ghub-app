import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function useResponsive(query: string, start: Breakpoint, end?: Breakpoint) {
	const theme = useTheme();

	const isMediaUp = useMediaQuery(theme.breakpoints.up(start));

	const isMediaDown = useMediaQuery(theme.breakpoints.down(start));

	const isMediaBetween = useMediaQuery(theme.breakpoints.between(start, end ?? 'xs'));

	const isMediaOnly = useMediaQuery(theme.breakpoints.only(start));

	if (query === 'up') {
		return isMediaUp;
	}

	if (query === 'down') {
		return isMediaDown;
	}

	if (query === 'between') {
		return isMediaBetween;
	}

	return isMediaOnly;
}
