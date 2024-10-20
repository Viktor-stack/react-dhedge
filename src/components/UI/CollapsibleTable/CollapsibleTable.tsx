import Row, { createData } from '@UI/CollapsibleTable/Row'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
	createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
	createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
	createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
]
// interface RowsTable {
//   rows:[]
// }
const CollapsibleTable = () => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='collapsible table'>
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align='right'>Calories</TableCell>
						<TableCell align='right'>Fat&nbsp;(g)</TableCell>
						<TableCell align='right'>Carbs&nbsp;(g)</TableCell>
						<TableCell align='right'>Protein&nbsp;(g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default CollapsibleTable
