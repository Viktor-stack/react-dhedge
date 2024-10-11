import { FC, useState } from 'react'
// import LoadingButton from '@mui/lab/LoadingButton';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
// import {IProject} from "../../../store/interface/SetupTypes/IProject";
// import {projectAPI} from "../../../store/service/Crypto/project.service";
// import {useMessageHooks} from "../../../hooks/messageHooks/messageHooks";

interface ActionsButtonProject {
	params: any
	handleOpenModal: (open: boolean, updateObj: any, titleForm: string) => void
	setIsLoading: (isLoading: boolean) => void
}

const ActionButtonProject: FC<ActionsButtonProject> = ({
	params,
	handleOpenModal,
	setIsLoading
}) => {
	const [isRune, setIsRune] = useState(false)
	// const row = params.row as IProject
	// const [installProject, {data: installProjectData}] = projectAPI.useFetchByProjectIdInstallMutation()
	// const [unInstallProject, {data: unInstallProjectData}] = projectAPI.useFetchByProjectIdUnInstallMutation()
	// const [startProject, {data: startProjectData}] = projectAPI.useFetchByProjectIdStartMutation()
	// const [stopProject, {data: stopProjectData}] = projectAPI.useFetchByProjectIdStopMutation()
	//
	//
	// useMessageHooks(unInstallProjectData)
	// useMessageHooks(startProjectData)
	// useMessageHooks(stopProjectData)
	// useMessageHooks(installProjectData)

	// const handleClickInstall = async () => {
	//     setIsLoading(true)
	//     setIsRune(true)
	//     if (!row.installed) {
	//         await installProject(row.id)
	//         setTimeout(() => {
	//             setIsLoading(false)
	//             setIsRune(false)
	//         }, 2000)
	//     } else {
	//         await unInstallProject(row.id)
	//         setTimeout(() => {
	//             setIsLoading(false)
	//             setIsRune(false)
	//         }, 2000)
	//     }
	// };
	// const handleClickStart = async () => {
	//     setIsLoading(true)
	//     if (!row.started) {
	//         await startProject(row.id)
	//         setTimeout(() => {
	//             setIsLoading(false)
	//         }, 2000)
	//     } else {
	//         await stopProject(row.id)
	//         setTimeout(() => {
	//             setIsLoading(false)
	//         }, 2000)
	//     }
	// }

	const handleClickUpdate = () => {
		// handleOpenModal(true, row, 'Edit')
	}
	return (
		<Box>
			{/*<LoadingButton*/}
			{/*    color={!row.installed ? 'success' : 'error'}*/}
			{/*    disabled={row.started || !row.enabled || isRune}*/}
			{/*    sx={{*/}
			{/*        marginRight: '10px',*/}
			{/*        fontWeight: '800',*/}
			{/*        minWidth: '100px',*/}
			{/*    }}*/}
			{/*    size="small"*/}
			{/*    onClick={handleClickInstall}*/}
			{/*    loadingPosition="center"*/}
			{/*    loading={row.started}*/}
			{/*    variant="contained"*/}
			{/*>*/}
			{/*    {!row.installed ? 'install' : 'uninstall'}*/}
			{/*</LoadingButton>*/}
			{/*<LoadingButton*/}
			{/*    color={!row.started ? 'success' : 'error'}*/}
			{/*    sx={{*/}
			{/*        marginRight: '10px',*/}
			{/*        fontWeight: 'bold'*/}
			{/*    }}*/}
			{/*    disabled={!row.installed || isRune}*/}
			{/*    size="small"*/}
			{/*    onClick={handleClickStart}*/}
			{/*    variant="contained"*/}
			{/*>*/}
			{/*    {!row.started ? 'start' : 'stop'}*/}
			{/*</LoadingButton>*/}
			<Button
				// disabled={row.installed}
				sx={{
					minWidth: '40px'
				}}
				size='small'
				color={'info'}
				onClick={handleClickUpdate}
				variant={'contained'}
			>
				<SystemUpdateAltIcon fontSize={'small'} />
			</Button>
		</Box>
	)
}

export default ActionButtonProject
