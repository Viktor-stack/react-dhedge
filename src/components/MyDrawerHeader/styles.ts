import {styled, Theme} from "@mui/material/styles";

export const ImgLogo = styled('img')(() => ({
    width: '40px',
    height: '40px'
}))

export const IconButtonStyled = (theme: Theme) => ({
    width: '30px',
    height: '30px',
    border: '1px dashed #454f5b70',
    backgroundColor: `${theme.palette.background.default}`,
    '&:hover': {
        backgroundColor: `${theme.palette.background.default}`
    }
})
