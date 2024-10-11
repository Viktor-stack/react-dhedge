import { useState, FocusEvent, ChangeEvent, useEffect } from 'react'
import useValidation from './useValidation'

const useInput = (
	titleForm: string,
	initialValue?: any,
	validation?: any,
	data?: any
) => {
	const [value, setValue] = useState<string | number | boolean>(initialValue)
	const valid = useValidation(value, validation, titleForm, data)
	const [isDirty, setIsDirty] = useState(false)
	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])
	useEffect(() => {
		if (initialValue?.value) {
			setValue(initialValue.value.toString())
		}
	}, [initialValue])

	const onChangeInput = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setValue(e.target.value)
	}
	const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setValue(e.target.checked)
		} else {
			setValue(e.target.checked)
		}
	}

	const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setIsDirty(true)
	}
	return {
		value,
		onBlur,
		onChangeCheckbox,
		onChangeInput,
		isDirty,
		...valid
	}
}
export default useInput
