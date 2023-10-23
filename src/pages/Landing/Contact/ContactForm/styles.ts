import { alpha, createTheme } from '@mui/material/styles';

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

export const textFieldCustomStyles = {
	'label + &': {
		marginTop: theme.spacing(3.5)
	},
	'& .MuiInputBase-input': {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: '#ffffff12',
		border: '1px solid',
		borderColor: '#E0E3E7',
		fontSize: 18,
		color: '#B8ADA7',
		width: '100%',
		padding: '12px 15px',
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow'
		]),
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		'&:focus': {
			boxShadow: `${alpha(palette.common.white, 0.25)} 0 0 0 0.2rem`,
			borderColor: '#CECECE'
		}
	},
	// Add focused styles here
	'& .Mui-focused': {
		color: '#B8ADA7'
	}
};
