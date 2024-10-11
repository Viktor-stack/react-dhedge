import Box from "@mui/material/Box/Box";
import {FC} from "react";
import {Typography} from "@mui/material";

interface Props {
  balance: string | number
  defaultTx: string
  usdcBalance: string
}

const HeaderForm: FC<Props> = ({balance= "", defaultTx = "", usdcBalance = ""}) => {
  return (
    <Box sx={{
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px'
    }}>
      <Box>
        <Typography variant="body2"
                    color="textSecondary"
                    fontSize={'15px'}
                    fontWeight={'bold'}>
          Balance: <Box component={'span'} sx={{}}>${Number(balance).toFixed(2)}</Box>
        </Typography>
        {/*<Typography variant="body2"*/}
        {/*            color="textSecondary"*/}
        {/*            fontSize={'15px'}*/}
        {/*            fontWeight={'bold'}>*/}
        {/*  DefaultTx: <Box component={'span'} sx={{}}>{defaultTx}</Box>*/}
        {/*</Typography>*/}
      </Box>
      {/*<Box>*/}
      {/*  <Typography variant="body2"*/}
      {/*              color="textSecondary"*/}
      {/*              fontSize={'15px'}*/}
      {/*              fontWeight={'bold'} component={'span'} sx={{}}>{usdcBalance} USDC</Typography>*/}
      {/*</Box>*/}
    </Box>
  );
};

export default HeaderForm;