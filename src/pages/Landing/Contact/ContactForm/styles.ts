import { createTheme } from '@mui/material/styles';

import palette from '../../../../theme/palette';


let themeCreate = createTheme({
});

themeCreate = createTheme({
	palette: {
		primary: themeCreate.palette.augmentColor({
			color: {
				main: palette.common.white
			},
		})
	}
});

export const theme = themeCreate;
