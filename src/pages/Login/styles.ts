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

export const headingLogin = Object.freeze<SxProps<Theme>>({
	fontWeight: '450',
	fontSize: '2vw',
});

export const descriptionLogin = Object.freeze<SxProps<Theme>>({
	fontSize: '1vw',
});


export const externalLoginBox = Object.freeze<SxProps<Theme>>({
	display: 'flex', padding: '15px', justifyContent: 'space-around'
});


export const newAccText= Object.freeze<SxProps<Theme>>({
	display: 'flex', justifyContent: 'center', fontWeight: '400', paddingTop: '15px'
});


export const createAccLink = Object.freeze<CSSProperties>({
	textDecoration: 'none', color: palette.orange[800], paddingLeft: '5px'
});
