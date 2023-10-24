import { Theme } from '@mui/material/styles/createTheme';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';


export const contactArticle = Object.freeze<CSSProperties>({
	color: 'white',
	backgroundImage: 'url(\'/assets/images/banner/Contact.png\')',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
});

export const headerBox = Object.freeze<SxProps<Theme>>({
	display: 'flex',
	flexDirection: 'column',
	flexWrap: 'wrap',
	alignItems: 'center',
	paddingTop: '25px',
});

export const heading = Object.freeze<SxProps<Theme>>({
	fontWeight: '450',
	fontSize: '2vw',
});

export const description = Object.freeze<SxProps<Theme>>({
	fontSize: '1vw',
});
