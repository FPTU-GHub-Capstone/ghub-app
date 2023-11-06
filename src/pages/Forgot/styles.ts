import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles/createTheme';


export const containerStyle = Object.freeze<SxProps<Theme>>({
	backgroundImage: 'url(\'/assets/images/banner/bg_forgot.png\')',
	backgroundSize: '100% 100vh',
	backgroundRepeat: 'no-repeat',
});

export const formContainer = Object.freeze<SxProps<Theme>>({
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
