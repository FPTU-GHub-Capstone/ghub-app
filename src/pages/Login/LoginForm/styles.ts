import { createTheme } from '@mui/material/styles';

import palette from '../../../theme/palette';


let themeCreate = createTheme({
});

themeCreate = createTheme({
	palette: {
		primary: themeCreate.palette.augmentColor({
			color: {
				main: palette.common.black
			},
		})
	}
});

export const theme = themeCreate;
