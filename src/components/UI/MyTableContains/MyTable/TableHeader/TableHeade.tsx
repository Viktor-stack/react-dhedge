import React, { FC, Fragment, useEffect, useState } from 'react'
import { TableCeil, TableHeader } from '../styles/styles'
import { MyTableProps } from '../../index'
import Box from '@mui/material/Box'

const MyTableHeader: FC<MyTableProps> = ({
	arrHead = [],
	configStr = {},
	arrRow = [],
	isActiveColumn
}) => {
	const [arrHeader, setArrHeader] = useState<any[]>([])
	const [arrRowe, setArrRowe] = useState<any[]>([])
	useEffect(() => {
		setArrHeader(arrHead)
	}, [arrHead])

	useEffect(() => {
		setArrRowe(arrRow)
	}, [arrRowe])

	return (
		<>
			<TableHeader>
				<TableCeil
					sx={{
						maxWidth: '200px'
					}}
				>
					Tokens
				</TableCeil>
				{arrHeader?.map(i => (
					<Fragment key={i.id}>
						<TableCeil>{i.name}</TableCeil>
					</Fragment>
				))}
				<Box
					sx={{
						position: 'absolute',
						top: '40px',
						width: '100%',
						left: 0
					}}
				>
					{arrRowe.map(i => (
						<Fragment key={i.id}>
							<TableCeil
								sx={{
									maxWidth: '200px'
								}}
							>
								{i.symbol}
							</TableCeil>
						</Fragment>
					))}
				</Box>
			</TableHeader>
		</>
	)
}

export default MyTableHeader
