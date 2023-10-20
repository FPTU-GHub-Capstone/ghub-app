import { Box, styled } from '@mui/material';


export const buttonCommonStyle = {
	width: 'calc(45% - 20px)',
	padding: '10px',
	margin: '10px',
	borderRadius: '25px',
	height: '50px',
};

export const BtnLogin = {
	...buttonCommonStyle,
	backgroundImage: 'linear-gradient(135deg, #FA2705, #FB9E3C)',
};

export const BtnRegister = {
	...buttonCommonStyle,
	backgroundImage: 'linear-gradient(135deg, #7F23F5, #2824F5)',
};

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

export const landingHeading = { 
	fontSize: '50px', 
	fontWeight: '600', 
	marginBottom: '10px' 
};

export const landingPageStyle = { 
	backgroundColor: '#39289F', 
	padding: '5vw' 
};
