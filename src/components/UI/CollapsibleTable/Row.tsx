import { FC, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
export function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
	price: number
) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history: [
			{
				date: '2020-01-05',
				customerId: '11091700',
				amount: 3
			},
			{
				date: '2020-01-02',
				customerId: 'Anonymous',
				amount: 1
			}
		]
	}
}

interface Row {
	row: ReturnType<typeof createData>
}

const Row: FC<Row> = ({ row }) => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row'>
					{row.name}
				</TableCell>
				<TableCell align='right'>{row.calories}</TableCell>
				<TableCell align='right'>{row.fat}</TableCell>
				<TableCell align='right'>{row.carbs}</TableCell>
				<TableCell align='right'>{row.protein}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant='h6' gutterBottom component='div'>
								History
							</Typography>
							<Table size='small' aria-label='purchases'>
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Customer</TableCell>
										<TableCell align='right'>Amount</TableCell>
										<TableCell align='right'>Total price ($)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.history.map(historyRow => (
										<TableRow key={historyRow.date}>
											<TableCell component='th' scope='row'>
												{historyRow.date}
											</TableCell>
											<TableCell>{historyRow.customerId}</TableCell>
											<TableCell align='right'>{historyRow.amount}</TableCell>
											<TableCell align='right'>
												{Math.round(historyRow.amount * row.price * 100) / 100}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}

export default Row
