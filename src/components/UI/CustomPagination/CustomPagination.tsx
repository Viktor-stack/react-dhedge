import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import {
	gridPageCountSelector,
	gridPageSelector
} from '@mui/x-data-grid/hooks/features/pagination/gridPaginationSelector'
import { useGridApiContext } from '@mui/x-data-grid/hooks/utils/useGridApiContext'
import { useGridSelector } from '@mui/x-data-grid/hooks/utils/useGridSelector'

export default function CustomPagination() {
	const apiRef = useGridApiContext()
	const page = useGridSelector(apiRef, gridPageSelector)
	const pageCount = useGridSelector(apiRef, gridPageCountSelector)

	return (
		<Stack spacing={2}>
			<Pagination
				showFirstButton
				showLastButton
				color='standard'
				variant='outlined'
				boundaryCount={0}
				siblingCount={1}
				shape='rounded'
				count={pageCount}
				page={page + 1}
				onChange={(event, value) => apiRef.current.setPage(value - 1)}
			/>
		</Stack>
	)
}
