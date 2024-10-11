import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'

const DataNotFound = () => {
	const theme = useTheme()
	return (
		<>
			<Box>
				<Typography
					sx={{
						color: `red`,
						width: '124px'
					}}
					fontSize={'15px'}
					fontWeight={'bold'}
					variant={'h6'}
				>
					Data not found
				</Typography>
			</Box>
			<Box>
				<Box
					sx={{
						width: '100px',
						height: '30px',
						boxShadow:
							'rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px',
						borderRadius: '15px',
						padding: '5px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: `rgba(171, 0, 0, 0.22)`,
						marginLeft: '30px'
					}}
				>
					<Typography
						fontWeight={'bold'}
						fontSize={'15px'}
						sx={{
							color: `${
								theme.palette.mode === 'dark'
									? `rgb(232, 134, 134)`
									: `rgb(128, 27, 27)`
							} `
						}}
					>
						Inactive
					</Typography>
				</Box>
			</Box>
		</>
	)
}

export default DataNotFound
