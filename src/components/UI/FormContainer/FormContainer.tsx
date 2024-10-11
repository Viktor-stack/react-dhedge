import React, {
	FC,
	Fragment,
	useEffect,
	useLayoutEffect,
	useState
} from 'react'
import { Box, Button, FormControl, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import UiSkeleton from '../Skeleton/Skeleton'
import UIInput from './Input/UIInput'
import UiSelect from './Select/UiSelect'
import { timeConverter } from '../../../shared/utils'
import useInput from '../../../hooks/useInput'

interface FormContainerProps {
	obj: any
	titleForm: string
	configFiled?: any
	onChangeInput: (formData: any) => void
	setOpenModal: (value: boolean) => void
	shoveCheckbox?: any
	configFieldsVisible?: any
	configSelect?: any
	selectData?: any[]
}

const FormContainer: FC<FormContainerProps> = ({
	obj = {},
	titleForm,
	configFiled = {},
	onChangeInput,
	setOpenModal,
	shoveCheckbox = {},
	configSelect = {},
	selectData = [],
	configFieldsVisible = {}
}) => {
	const theme = useTheme()
	const [dirty, setDirty] = useState(true)
	const [field, setFiled] = useState<string[]>([])
	const [isLoad, setIsLoad] = useState(true)
	const [formDate, setFormDate] = useState<{}>({})
	const [checkbox, setCheckbox] = useState({})
	const [createdAt, setCreatedAt] = useState('')
	const [updatedAt, setUpdatedAt] = useState('')
	useEffect(() => {
		setCheckbox(shoveCheckbox)
	}, [shoveCheckbox])

	useLayoutEffect(() => {
		if (titleForm === 'Edit' || titleForm === 'View') {
			setFiled(Object.keys(obj))
			if (obj.createdAt || obj.updatedAt) {
				setCreatedAt(timeConverter(obj.createdAt))
				setUpdatedAt(timeConverter(obj.updatedAt))
			}
			if (obj.installedAt || obj.startedAt) {
				setCreatedAt(timeConverter(obj.installedAt))
				setUpdatedAt(timeConverter(obj.startedAt))
			}
		}
		if (titleForm === 'Create') {
			setFormDate(obj)
			setFiled(Object.keys(obj))
		}
		setIsLoad(false)
	}, [obj, titleForm])

	const handleInput = (filed: string, value?: string | boolean | number) => {
		if (titleForm === 'Edit' || titleForm === 'View') {
			setFormDate({
				...formDate,
				id: obj.id,
				[filed]: value
			})
		}
		if (titleForm === 'Create') {
			setFormDate({
				...formDate,
				[filed]: value
			})
		}
	}

	const submitForm = () => {
		if (titleForm === 'Edit') {
			onChangeInput(formDate)
		}
		if (titleForm === 'Delete') {
			onChangeInput({ id: obj.id })
		}
		if (titleForm === 'Create') {
			onChangeInput(formDate)
		}
		setOpenModal(false)
	}

	return (
		<Box
			sx={{
				height: '100%',
				borderRadius: '15px',
				width: '100%',
				backgroundColor: `${theme.palette.background.paper}`
			}}
		>
			<Box
				component={'form'}
				sx={{
					display: 'block',
					padding: '15px',
					width: '100%'
				}}
			>
				{isLoad && <UiSkeleton />}
				{!isLoad && (
					<>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								p: '30px 0px 0px 0px'
							}}
						>
							<Typography fontWeight={'bold'} variant={'h4'}>
								{titleForm}
							</Typography>
							{titleForm !== 'Create' && titleForm !== 'Delete' && (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									{(createdAt || updatedAt) && (
										<>
											<Typography
												sx={{
													border: `1px dashed ${theme.palette.info.main}`,
													borderRadius: '10px',
													padding: '5px',
													backgroundColor: `${theme.palette.background.default}`
												}}
												color={theme.palette.info.main}
												mr={1}
												ml={1}
											>
												{obj.installedAt ? 'Installed At' : 'Create At'}{' '}
												{createdAt}
											</Typography>
											<Typography
												sx={{
													border: `1px dashed ${theme.palette.success.main}`,
													borderRadius: '10px',
													padding: '5px',
													backgroundColor: `${theme.palette.background.default}`
												}}
												color={theme.palette.success.main}
											>
												{obj.startedAt ? 'Started At' : 'Update At'} {updatedAt}
											</Typography>
										</>
									)}
								</Box>
							)}
						</Box>

						<Box
							sx={{
								mt: '10px'
							}}
						>
							{field.map(i => (
								<Fragment key={i}>
									{i !== configFieldsVisible[i] && (
										<FormControl
											sx={{
												p: 1,
												pl: 2,
												pr: 2
											}}
											fullWidth
										>
											{configSelect[i] && (
												<UiSelect
													configFiled={configFiled}
													titleForm={titleForm}
													setDirty={setDirty}
													handleInput={handleInput}
													data={obj[i].id}
													field={i}
													selectNode={selectData}
												/>
											)}
											{!configSelect[i] && (
												<UIInput
													obj={obj}
													shoveCheckbox={checkbox}
													nameFiled={i}
													setDirty={setDirty}
													value={obj[i]}
													titleForm={titleForm}
													configFiled={configFiled}
													handleInput={handleInput}
												/>
											)}
										</FormControl>
									)}
								</Fragment>
							))}
							{titleForm === 'Edit' && (
								<Button
									sx={{
										fontSize: '16px',
										fontWeight: 'bold'
									}}
									fullWidth
									variant={'contained'}
									color={'success'}
									disabled={!dirty}
									onClick={submitForm}
								>
									Save
								</Button>
							)}
							{titleForm === 'Delete' && (
								<Button
									sx={{
										fontSize: '16px',
										fontWeight: 'bold'
									}}
									fullWidth
									variant={'contained'}
									color={'error'}
									onClick={submitForm}
								>
									Delete
								</Button>
							)}
							{titleForm === 'Create' && (
								<Button
									sx={{
										fontSize: '16px',
										fontWeight: 'bold'
									}}
									fullWidth
									variant={'contained'}
									color={'secondary'}
									disabled={!dirty}
									onClick={submitForm}
								>
									Create
								</Button>
							)}
						</Box>
					</>
				)}
			</Box>
		</Box>
	)
}

export default FormContainer
