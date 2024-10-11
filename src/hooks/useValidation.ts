import { useEffect, useState } from 'react'

const useValidation = (
	value: any,
	validation: any,
	titleForm: string,
	data: any
) => {
	const [isEmpty, setIsEmpty] = useState<boolean>(true)
	const [isFormValid, setIsFormValid] = useState<boolean>(true)
	useEffect(() => {
		if (typeof value === 'boolean') {
			return
		} else {
			for (const validationKey in validation) {
				switch (validationKey) {
					case 'isEmpty':
						value ? setIsEmpty(false) : setIsEmpty(true)
				}
			}
		}
	}, [value])

	useEffect(() => {
		if (isEmpty) {
			setIsFormValid(false)
		} else {
			setIsFormValid(true)
		}
	}, [isEmpty])
	return {
		isEmpty,
		isFormValid
	}
}

export default useValidation
