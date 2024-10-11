import React from 'react'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

interface TransitionAlertsProps {
	isOpen: boolean

	content: string

	severity?: AlertColor
}

export default function TransitionAlerts({
	isOpen,
	content,
	severity
}: TransitionAlertsProps) {
	const [open, setOpen] = React.useState(false)
	useEffect(() => {
		setOpen(isOpen)
	}, [isOpen])

	return (
		<Box>
			<Collapse in={open}>
				<Alert
					severity={severity}
					sx={{ mb: 2 }}
				>
					{content}
				</Alert>
			</Collapse>
		</Box>
	)
}
