import { createTheme } from '@mui/material/styles';

import palette from '../../theme/palette';


export const theme = createTheme({
	palette: {
		primary: {
			main: palette.orange[800]
		},
	},
});
