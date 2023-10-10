import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'


type ArticleType = {
	title: string,
	content: string,
};

const articles: ArticleType[] = [
	{
		title: 'Lorem Ipsum',
		content:
"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
	},
	{
		title: 'Lorem Ipsum',
		content:
"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
	},
	{
		title: 'Lorem Ipsum',
		content:
"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
	},
]

const Article: React.FC<ArticleType> = ({ title, content }) => (
	<Box
		component="section"
		sx={{
			width: 'calc(33.33% - 20px)', // 1/3 width minus padding and margin
			backgroundColor: '#1C140F',
			color: '#fff',
			borderRadius: '15px',
			padding: '20px',
			margin: '10px',
		}}
	>
		<Typography component="h2" mb='10px' sx={{fontSize: '25px'}}>{title}</Typography>
		<Typography component="p"  sx={{fontSize: '15px'}}>{content}</Typography>
	</Box>
)

const ButtonStyle1 = {
	width: 'calc(45% - 20px)', padding: '10px', margin: '10px', borderRadius: '25px', height: '50px', backgroundImage: 'linear-gradient(135deg, #FA2705, #FB9E3C)'
}

const ButtonStyle2 = {
	width: 'calc(45% - 20px)', padding: '10px', margin: '10px', borderRadius: '25px', height: '50px', backgroundImage: 'linear-gradient(135deg, #7F23F5, #2824F5)',
}


export const Landing: React.FC = () => {
	return (
		<>
			<div style={{ backgroundColor: '#39289F', padding: '5vw'}}>
				<Box component='section' 
					sx={{
						display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white',
						margin: '25px'	
					}}
				>
					<Typography component='h1' sx={{fontSize: '50px', fontWeight: '600', marginBottom: '10px'}}>Game Pushing System</Typography>
					<Typography component='p'>A completely new way to manage your games</Typography>
					<Box sx={{display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', width: '35vw', padding: '10px', margin: '25px'}}>
						<Button component={RouterLink} to="/" variant='contained' sx={ButtonStyle1}>Sign up</Button>
						<Button component={RouterLink} to="/" variant='contained' sx={ButtonStyle2}>Login</Button>
					</Box>
					{//Image here
					}
					<img src='/assets/images/banner/dashboard.png' alt='GHUB Dashboard layout' width='100%'></img>
				</Box>
				<Box component='section' 
					sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white'}}
				>
					<Typography component='h2' sx={{fontSize: '40px',  fontWeight: '500', marginBottom: '10px'}}>Why GHUB</Typography>
					<Typography textAlign='center'>
						Lorem Ipsum is simply dummy text of the printing {' '}<br/>
						and typesetting industry. 
					</Typography>
					<Box component="div"
						sx={{
							display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap',
							margin: '20px'
						}}
					>
						{articles.map((article, index) => (
							<Article key={index} {...article} />
						))}
					</Box>
				</Box>

			</div>

		</>
	)
}
