import { FC } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { NavLink as Link } from 'react-router-dom'
import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MIN_WIDTH } from '../../../shared/configMedia/config'
import { listItemStyled } from './styled'
import { MenuTypes } from '../../../router/router'

export const ListItemLink: FC<MenuTypes> = ({
	open,
	linkName,
	href,
	handleDrawer
}) => {
	const matches = useMediaQuery(MIN_WIDTH)
	const theme = useTheme()
	const clickHandle = () => {
		if (!matches) {
			if (handleDrawer) {
				handleDrawer()
			}
		}
	}
	return (
		<Box
			component='li'
			sx={{
				marginBottom: '5px'
			}}
		>
			<ListItem
				onClick={clickHandle}
				button={true}
				component={Link}
				to={href}
				sx={listItemStyled(theme)}
			>
				<ListItemText
					sx={{
						span: {
							fontWeight: 'bold',
							fontSize: '13px',
							color: `${theme.palette.text.secondary}`
						}
					}}
					primary={linkName}
				/>
			</ListItem>
		</Box>
	)
}
