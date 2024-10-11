import {Theme} from "@mui/material/styles";
import {SxProps} from "@mui/material";

export const listItemStyled = (theme: Theme): SxProps => ({
    borderRadius: '15px',
    position: 'relative',
    paddingLeft: '50px',
    '&:after': {
        content: "''",
        position: 'absolute',
        left: '27px',
        top: '15px',
        width: '4px',
        height: '4px',
        borderRadius: '100%',
        backgroundColor: `${theme.palette.text.primary}`
    },
    height: '36px',
    '&.active': {
        '& span': {
            color: `${theme.palette.text.primary}`,
        },
        '&:after': {
            transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            backgroundColor: `rgb(0, 171, 85)`,
            transform: 'scale(2)'
        }
    }

})
