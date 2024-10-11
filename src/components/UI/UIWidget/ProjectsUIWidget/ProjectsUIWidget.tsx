import React from 'react'
import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone'
import Typography from '@mui/material/Typography'
import UiWidget from '@UI/style/style'

const ProjectsUIWidget = () => {
	const theme = useTheme()
	return (
		<UiWidget>
			<Box>
				<Typography fontWeight={'bold'} fontSize={'32px'} variant={'h3'}>
					714k
				</Typography>
				<Typography
					color={theme.palette.text.secondary}
					fontWeight={'bold'}
					fontSize={'14px'}
					variant={'h6'}
				>
					Total Booking
				</Typography>
			</Box>
			<Box>
				<AccountTreeTwoToneIcon
					sx={{
						fontSize: '80px',
						color: '#00AB55'
					}}
				/>
			</Box>
		</UiWidget>
	)
}

export default ProjectsUIWidget
