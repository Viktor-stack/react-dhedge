import React, { FC } from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import UiWidget from '@UI/style/style'
import PropaneTwoToneIcon from '@mui/icons-material/PropaneTwoTone'

const GasUIWidget: FC = () => {
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
				<PropaneTwoToneIcon
					sx={{
						fontSize: '140px',
						color: '#00AB55'
					}}
				/>
			</Box>
		</UiWidget>
	)
}

export default GasUIWidget
