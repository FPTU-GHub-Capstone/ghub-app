import { Theme } from '@mui/material/styles/createTheme';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';


export const navbarStyle = Object.freeze<CSSProperties>({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	backgroundColor: '#061B64',
	zIndex: 100,
	padding: '10px',
});

export const ulStyle = Object.freeze<CSSProperties>({
	listStyleType: 'none',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	marginTop: '8px',
	marginBottom: '8px',
});

export const liStyle = Object.freeze<CSSProperties>({
	marginLeft: '15px',
	marginRight: '15px',
});

export const linkStyle = Object.freeze<CSSProperties>({
	textDecoration: 'none',
	color: 'white',
});

export const divLogoStyle = Object.freeze<CSSProperties>({
	display: 'flex',
	alignItems: 'center',
	marginLeft: '15px',
});

export const textLogoStyle = Object.freeze<SxProps<Theme>>({
	fontWeight: 700, 
	fontSize: '26px', 
	color: 'white', 
	marginLeft: '10px', 
	marginRight: '5px',
});
