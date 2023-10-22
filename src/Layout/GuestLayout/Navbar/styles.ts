import { CSSProperties } from 'react';


export const navbarStyle: CSSProperties = {
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
};

export const ulStyle: CSSProperties = {
	listStyleType: 'none',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	marginTop: '8px',
	marginBottom: '8px',
};

export const liStyle: CSSProperties = {
	marginLeft: '15px',
	marginRight: '15px',
};

export const linkStyle: CSSProperties = {
	textDecoration: 'none',
	color: 'white',
};

export const textLogoStyle = { 
	fontWeight: 700, 
	fontSize: '26px', 
	color: 'white', 
	marginLeft: '10px', 
	marginRight: '5px' 
};

