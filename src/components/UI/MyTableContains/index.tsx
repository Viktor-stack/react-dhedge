import { FC } from 'react'
import { useMediaQuery } from '@mui/material'
import { MIN_WIDTH } from '../../../shared/configMedia/config'
import MyTable from './MyTable/MyTable'
import BoxLayoutTable from './BoxLayoutTable/BoxLayoutTable'
export interface MyTableProps {
	arrHead?: any[]
	arrRow?: any[]
	configStr: any
	height?: number
	isActiveColumn?: boolean
}

const MyTableContains: FC<MyTableProps> = ({
	arrHead = [],
	configStr = {},
	arrRow = [],
	isActiveColumn = false,
	height
}) => {
	const matches = useMediaQuery(MIN_WIDTH)
	return (
		<>
			{matches ? (
				<MyTable
					height={height}
					arrHead={arrHead}
					arrRow={arrRow}
					configStr={configStr}
					isActiveColumn={isActiveColumn}
				/>
			) : (
				<BoxLayoutTable />
			)}
		</>
	)
}

export default MyTableContains
