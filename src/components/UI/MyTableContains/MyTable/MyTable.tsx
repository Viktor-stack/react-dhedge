import React, { FC } from 'react'
import { LayoutTable, TableInner } from './styles/styles'
import { useTheme } from '@mui/material/styles'
import MyTableHeader from './TableHeader/TableHeade'
import { MyTableProps } from '../index'

const MyTable: FC<MyTableProps> = ({
	arrHead = [],
	arrRow = [],
	configStr = {},
	isActiveColumn = false,
	height
}) => {
	return (
		<TableInner height={height}>
			<MyTableHeader
				arrHead={arrHead}
				arrRow={arrRow}
				configStr={configStr}
				isActiveColumn={isActiveColumn}
			/>
		</TableInner>
	)
}

export default MyTable
