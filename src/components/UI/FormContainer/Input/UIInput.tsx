import React, { FC, useEffect, useState } from 'react'
import { strUtils } from '../../../../shared/utils'
import useTheme from '@mui/material/styles/useTheme'
import Checkbox from '@mui/material/Checkbox'
import useInput from '../../../../hooks/useInput'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'

interface InputProps {
	obj?: any
	nameFiled: string
	value: string | boolean
	titleForm: string
	configFiled: any
	handleInput: (filed: string, value?: string | number | boolean) => void
	setDirty: (value: boolean) => void
	shoveCheckbox: any
}

export enum TypeSettings {
	STRING = 'String',
	INTEGER = 'Integer',
	BOOLEAN = 'Boolean',
	DOUBLE = 'Double'
}

const UIInput: FC<InputProps> = ({
	value,
	nameFiled,
	titleForm,
	handleInput,
	configFiled,
	setDirty,
	shoveCheckbox,
	obj = {}
}) => {
	const theme = useTheme()
	const [data, setData] = useState<string | boolean | number>('')
	const [label, setLabel] = useState<string>('')
	const input = useInput(titleForm, value, { isEmpty: true }, obj)

	useEffect(() => {
		setDirty(input.isFormValid)
	}, [input.isFormValid, data])

	useEffect(() => {
		handleInput(nameFiled, input.value)
	}, [input.value])

	const handleFiledDisabled = (key: string): boolean => {
		return key === configFiled[key]
	}
	useEffect(() => {
		setLabel(strUtils(nameFiled))
	}, [nameFiled])

	const checkType = (type: any): string => {
		switch (type) {
			case TypeSettings.STRING:
				return 'text'
			case TypeSettings.DOUBLE:
				return 'number'
			case TypeSettings.INTEGER:
				return 'number'
			case TypeSettings.BOOLEAN:
				return 'checkbox'
			default:
				return 'text'
		}
	}

	useEffect(() => {
		setData(value)
		if (nameFiled === 'value' && checkType(obj.type) === 'checkbox') {
			if (obj.value === 'true') {
				setData(true)
			}
			if (obj.value === 'false') {
				setData(false)
			}
		}
	}, [value, nameFiled, obj.type, obj.value])

	return (
		<>
			{shoveCheckbox[nameFiled] !== nameFiled &&
			(nameFiled !== 'value' || checkType(obj.type) !== 'checkbox') ? (
				<>
					<TextField
						error={input.isDirty && input.isEmpty}
						value={input.value}
						inputProps={
							nameFiled === 'value' && checkType(obj.type) === 'number'
								? {
										step: 0.1,
										min: 0,
										max: 99999,
										type: 'number'
								  }
								: {}
						}
						color='success'
						type={nameFiled === 'value' ? checkType(obj.type) : 'text'}
						fullWidth
						label={label}
						onBlur={e => input.onBlur(e)}
						disabled={
							titleForm === 'View' ||
							titleForm === 'Delete' ||
							handleFiledDisabled(nameFiled)
						}
						onChange={event => input.onChangeInput(event)}
						sx={{
							'.MuiFormLabel-root': {
								color: `${theme.palette.text.primary}`
							}
						}}
					/>
					{input.isDirty && input.isEmpty ? (
						<FormHelperText
							variant={'outlined'}
							children={'The field cannot be empty'}
							inputMode={'text'}
							sx={{
								color: '#f44336',
								fontSize: '12px',
								fontWeight: 'bold'
							}}
						/>
					) : (
						<FormHelperText
							children={' '}
							inputMode={'text'}
							sx={{
								fontSize: '12px',
								fontWeight: 'bold'
							}}
						/>
					)}
				</>
			) : (
				<FormControlLabel
					control={
						<Checkbox
							color={'success'}
							value={!!input.value}
							checked={!!input.value}
							disabled={
								titleForm === 'View' ||
								titleForm === 'Delete' ||
								handleFiledDisabled(nameFiled)
							}
							onChange={event => input.onChangeCheckbox(event)}
						/>
					}
					label={label}
				/>
			)}
		</>
	)
}

export default UIInput
