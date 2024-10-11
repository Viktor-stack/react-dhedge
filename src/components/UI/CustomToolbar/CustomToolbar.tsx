import useTheme from '@mui/material/styles/useTheme'
import { GridToolbarContainer } from '@mui/x-data-grid/components/containers/GridToolbarContainer'
import { GridToolbarColumnsButton } from '@mui/x-data-grid/components/toolbar/GridToolbarColumnsButton'
import { GridToolbarDensitySelector } from '@mui/x-data-grid/components/toolbar/GridToolbarDensitySelector'
import { GridToolbarExport } from '@mui/x-data-grid/components/toolbar/GridToolbarExport'

const CustomToolbar = () => {
	const theme = useTheme()
	return (
		<GridToolbarContainer
			sx={{
				borderTopLeftRadius: '15px',
				borderTopRightRadius: '15px',
				background: `${theme.palette.success.main}`
			}}
		>
			<GridToolbarColumnsButton />
			<GridToolbarDensitySelector />
			<GridToolbarExport />
		</GridToolbarContainer>
	)
}

export default CustomToolbar
