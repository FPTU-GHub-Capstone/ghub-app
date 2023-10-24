import { Box, styled } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';


export const buttonCommonStyle = Object.freeze<SxProps<Theme>>({
	width: 'calc(45% - 20px)',
	padding: '10px',
	margin: '10px',
	borderRadius: '25px',
	height: '50px',
});

export const BtnLogin = Object.freeze<SxProps<Theme>>({
	...buttonCommonStyle,
	backgroundImage: 'linear-gradient(135deg, #FA2705, #FB9E3C)',
});

export const BtnRegister = Object.freeze<SxProps<Theme>>({
	...buttonCommonStyle,
	backgroundImage: 'linear-gradient(135deg, #7F23F5, #2824F5)',
});

export const LandingHeaderSection = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	color: 'white',
	margin: '25px',
	marginBottom: '100px',
});

export const BtnLayout = styled(Box)({
	display: 'flex',
	alignContent: 'center',
	alignItems: 'center',
	justifyContent: 'center',
	width: '35vw',
	padding: '10px',
	margin: '25px',
});

export const landingHeading = Object.freeze<SxProps<Theme>>({ 
	fontSize: '50px', 
	fontWeight: '600', 
	marginBottom: '10px' 
});

export const landingPageStyle = Object.freeze<CSSProperties>({ 
	backgroundColor: '#39289F', 
	padding: '5vw' 
});
