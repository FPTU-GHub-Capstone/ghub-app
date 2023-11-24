import { styled } from '@mui/material/styles';
import { Link, Avatar } from '@mui/material';


export const CardMedia = styled('div')({
	position: 'relative',
	paddingTop: 'calc(100% * 3 / 4)',
});

export const Title = styled(Link)({
	height: 44,
	overflow: 'hidden',
	WebkitLineClamp: 2,
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
});

export const AvatarCustom = styled(Avatar)(({ theme }) => ({
	zIndex: 9,
	width: 32,
	height: 32,
	position: 'absolute',
	left: theme.spacing(3),
	bottom: theme.spacing(-2),
}));

export const Info = styled('div')(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-end',
	marginTop: theme.spacing(3),
	color: theme.palette.text.disabled,
}));

export const Cover = styled('img')({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
});
