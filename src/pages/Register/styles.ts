import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles/createTheme';
import { CSSProperties } from 'react';

import palette from '../../theme/palette';


export const headingBox = Object.freeze<SxProps<Theme>>({
	display: 'flex',
	flexDirection: 'column',
	flexWrap: 'wrap',
	alignItems: 'center',
	paddingTop: '25px',
});

export const headingRegister = Object.freeze<SxProps<Theme>>({
	fontWeight: '450',
	fontSize: '2vw',
});

export const descriptionRegister = Object.freeze<SxProps<Theme>>({
	fontSize: '1vw',
});

export const externalSignUpBox = Object.freeze<SxProps<Theme>>({
	display: 'flex',
	padding: '15px',
	justifyContent: 'space-around',
});

export const haveAccText = Object.freeze<SxProps<Theme>>({
	display: 'flex',
	justifyContent: 'center',
	fontWeight: '400',
	paddingTop: '15px',
});

export const loginLink = Object.freeze<CSSProperties>({
	textDecoration: 'none',
	color: palette.orange[800],
	paddingLeft: '5px',
});
