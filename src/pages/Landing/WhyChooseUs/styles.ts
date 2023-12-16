import { Theme } from '@mui/material/styles/createTheme';
import { SxProps } from '@mui/system';


export const SectionStyle = Object.freeze<SxProps<Theme>>({ 
	display: 'flex', 
	flexDirection: 'column', 
	alignItems: 'center', 
	color: '#212B36' 
});

export const MainHeading =  Object.freeze<SxProps<Theme>>({ 
	fontSize: '40px', 
	fontWeight: '500', 
	marginBottom: '10px' 
});

export const ArticlesDisplay =  Object.freeze<SxProps<Theme>>({
	display: 'flex', 
	flexDirection: 'row', 
	justifyContent: 'space-between', 
	flexWrap: 'wrap',
	margin: '25px', marginBottom: '75px',
});

