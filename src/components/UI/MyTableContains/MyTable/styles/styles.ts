import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { tokens } from '@theme'

export const LayoutTable = styled(Box)(({ theme, sx }) => ({
	minWidth: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	backgroundColor: `${
		theme.palette.mode === 'dark'
			? theme.palette.background.default
			: tokens(theme.palette.mode).grey['900']
	}`,
	padding: '5px',
	borderRadius: '20px',
	height: `${sx ? sx : '87vh'}`,
	border: '1px dashed #454f5b70',
	boxShadow:
		'rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px'
}))

export const TableInner = styled(Box)(({ theme, height }) => ({
	width: '100%',
	boxSizing: 'border-box',
	overflow: 'hidden',
	border: '1px dashed #cccccc',
	borderRadius: '15px',
	height: `${height ? height + 'vh' : '50vh'}`,
	backgroundColor: `${theme.palette.background.default}`,
	boxShadow:
		'rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px'
})) as typeof Box

export const TableHeader = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	height: '40px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: `${
		theme.palette.mode === 'dark'
			? theme.palette.background.paper
			: tokens(theme.palette.mode).grey['800']
	}`
})) as typeof Box

export const TableCeil = styled(Box)(({ theme, sx }) => ({
	width: '100%',
	height: '100%',
	fontWeight: 'bold',
	display: 'inherit',
	alignItems: 'center',
	padding: '5px 15px 5px',
	color: `${theme.palette.text.primary}`,
	borderRight: `1px solid ${theme.palette.text.secondary}`,
	borderBottom: `1px solid ${theme.palette.text.secondary}`
})) as typeof Box
