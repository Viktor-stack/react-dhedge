import {Theme} from "@mui/material/styles";
import {SxProps} from "@mui/material";
import {tokens} from "../../theme";

export const listItemButtonStyles = (menuString: string, linkName: string, theme: Theme, matches: boolean, open?: boolean): SxProps => (
    (menuString === linkName) ?
        {
            backgroundColor: tokens(theme.palette.mode).greenAccent['A100'],
            color: `${theme.palette.text.primary}`,
            minHeight: 48,
            flexDirection: !open && matches ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: "center",
            px: 2.5,
            marginBottom: '5px',
            borderRadius: '15px',
            border: '1px dashed #00AB55'
        } : {
            flexDirection: !open && matches ? 'column' : 'row',
            color: `${theme.palette.text.primary}`,
            minHeight: 48,
            alignItems: "center",
            justifyContent: 'center',
            px: 2.5,
            marginBottom: '5px',
            borderRadius: '15px'
        }
)

export const listItemIconStyles = (menuString: string, linkName: string, theme: Theme, open?: boolean,): SxProps => (
    (menuString === linkName) ? {
        minWidth: 0,
        mr: open ? 3 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: !open ? 'center' : 'space-between',
        'svg': {
            fill: '#00AB55'
        },
    } : {
        minWidth: 0,
        mr: open ? 3 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: !open ? 'center' : 'space-between',
        'svg': {
            fill: `${theme.palette.text.primary}`
        },
    }
)

export const listItemTextStyles = (menuString: string, linkName: string, theme: Theme, open?: boolean): SxProps => (
    (menuString === linkName) ? {
        color: tokens(theme.palette.mode).greenAccent['A200'],
        'span': {
            fontSize: open ? '14px' : '11px',
            fontWeight: 'bold',
        }
    } : {
        'span': {
            fontWeight: 'bold',
            fontSize: open ? '14px' : '11px'
        }
    }
)

export const listStyled = (): SxProps => ({
    overflowX: 'hidden',
    paddingLeft: '5px',
    paddingRight: '5px'
})
