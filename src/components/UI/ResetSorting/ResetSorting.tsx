import React, { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface ResetSortingProps {
	isArrLength?: boolean

	isResetHandler?: (isReset: boolean) => void
}

const ResetSorting: FC<ResetSortingProps> = ({ isResetHandler }) => {
	const [isReset, setIsReset] = useState(false)
	const handlerResetSorting = () => {
		setIsReset(true)
	}
	useEffect(() => {
		if (isResetHandler) {
			isResetHandler(isReset)
		}
	}, [isReset])
	return (
		<Box>
			<Button
				size={'small'}
				color={'warning'}
				variant={'outlined'}
				onClick={handlerResetSorting}
			>
				Reset sort
			</Button>
		</Box>
	)
}

export default ResetSorting
