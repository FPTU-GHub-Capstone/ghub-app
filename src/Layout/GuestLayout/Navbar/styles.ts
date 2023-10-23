import { Theme } from '@mui/material/styles/createTheme';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';


export const navbarStyle: CSSProperties = Object.freeze({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	backgroundColor: '#39289F',
	zIndex: 100,
	padding: '10px',
});

export const ulStyle: CSSProperties = Object.freeze({
	listStyleType: 'none',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	marginTop: '8px',
	marginBottom: '8px',
});

export const liStyle: CSSProperties = Object.freeze({
	marginLeft: '15px',
	marginRight: '15px',
});

export const linkStyle: CSSProperties = Object.freeze({
	textDecoration: 'none',
	color: 'white',
});

export const divLogoStyle: CSSProperties = Object.freeze({
	display: 'flex',
	alignItems: 'center',
	marginLeft: '15px',
});

export const textLogoStyle: SxProps<Theme> = Object.freeze({ 
	fontWeight: 700, 
	fontSize: '26px', 
	color: 'white', 
	marginLeft: '10px', 
	marginRight: '5px',
});
