import React, {FC, ReactNode} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

interface ModalContainerProps {
    children?: ReactNode;
    handleClose: (open: boolean) => void;
    open: boolean;
    isVisible?: boolean
}

const style = {
    position: "absolute" as "absolute",
    // white: "500px",
    height: "100%",
    top: "50%",
    left: "50%",
    overflow: "hidden",
    // width: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: 24,
    padding: "40px 10px 40px 10px"
};
const ModalContainer: FC<ModalContainerProps> = ({
                                                     children,
                                                     handleClose,
                                                     open,
                                                     isVisible = true
                                                 }) => {
    const matches = useMediaQuery(MIN_WIDTH);
    return (
        <Modal
            open={open}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
            <Box
                sx={
                    matches
                        ? {...style, height: "auto", padding: "0px"}
                        : {...style, height: "100vh", width: "100%"}
                }
                >
                {isVisible &&
                    (<IconButton
                        size={"small"}
                        color={"error"}
                        sx={
                            matches
                                ? {
                                    right: 15,
                                    top: 10,
                                    position: "absolute",
                                    zIndex: (theme) => theme.zIndex.modal + 100
                                }
                                : {
                                    top: 50,
                                    right: 20,
                                    position: "absolute",
                                    zIndex: (theme) => theme.zIndex.modal + 100
                                }
                        }
                        onClick={() => handleClose(false)}>
                        <CloseIcon/>
                    </IconButton>)
                }
                {children}
            </Box>
        </Modal>
    );
};

export default ModalContainer;
