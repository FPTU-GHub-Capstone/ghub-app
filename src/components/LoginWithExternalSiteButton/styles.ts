import { createTheme } from '@mui/material/styles';

import palette from '../../theme/palette';


let themeCreate = createTheme({
});


themeCreate = createTheme({
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true, 
				disableTouchRipple: true
			},
		},
	}, 
	palette: {
		primary: themeCreate.palette.augmentColor({
			color: {
				main: palette.common.black
			},
		})
	}
});

export const theme = themeCreate;
