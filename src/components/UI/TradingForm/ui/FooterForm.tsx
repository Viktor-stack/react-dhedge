import Box from "@mui/material/Box/Box";
import {Typography} from "@mui/material";
import { FC } from "react";
interface Props {
  txCommission: string
  maxFeePerGas: string
  txAmount: string
  txCount: string
}
const FooterForm:FC<Props> = ({txCommission, maxFeePerGas, txAmount, txCount}) => {

  return (
    <Box>
      {/*<Typography*/}
      {/*  textAlign={'right'}*/}
      {/*  variant="body2"*/}
      {/*  color="textSecondary"*/}
      {/*  fontWeight={'bold'}*/}
      {/*  fontSize={'15px'}*/}
      {/*>*/}
      {/*  1 WBTC = 65782,4534 USDC*/}
      {/*</Typography>*/}
        <Typography
          variant="body2"
          color="textSecondary"
          fontSize={'15px'}
          fontWeight={'bold'}
        >
          Gas:  {maxFeePerGas}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          fontSize={'15px'}
          fontWeight={'bold'}
        >
          Tx Amount: {txAmount}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          fontSize={'15px'}
          fontWeight={'bold'}
        >
          Count Amount: {txCount}
        </Typography>
      <Box sx={{
        marginTop: '15px'
      }}>
        <Typography
          variant="body2"
          color="textSecondary"
          fontSize={'15px'}
          fontWeight={'bold'}
        >
          Amount Commission: {txCommission}
        </Typography>
      </Box>
    </Box>
  );
};

export default FooterForm;