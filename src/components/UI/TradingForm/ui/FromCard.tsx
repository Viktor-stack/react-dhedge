import {FC, ReactNode} from "react";

import Box from "@mui/material/Box/Box";
import {useTheme} from "@mui/material";

interface ITokenFromCard {
  children: ReactNode;
}

const FromCard:FC<ITokenFromCard> = ({children}) => {
  const theme = useTheme()
  return (
    <Box sx={{
      boxSizing: 'border-box',
      borderRadius:'10px',
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom:'15px',
      padding: '10px',
      flexWrap: 'wrap'
    }}>
      {children}
    </Box>
  );
};

export default FromCard;