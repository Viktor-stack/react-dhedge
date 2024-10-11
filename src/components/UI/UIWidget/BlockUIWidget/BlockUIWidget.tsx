import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone'
import UiWidget from '@UI/style/style'
import Box from '@mui/material/Box'

const BlockUIWidget = () => {
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
				<LeaderboardTwoToneIcon
					color={'info'}
					sx={{
						fontSize: '140px',
						color: '#00AB55'
					}}
				/>
			</Box>
		</UiWidget>
	)
}

export default BlockUIWidget
