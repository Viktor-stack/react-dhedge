import Box from "@mui/material/Box/Box";
import { FC } from "react";
import { Typography } from "@mui/material";
import { ISpotTokens } from "../../../../redux/interface/Trading/IMarketForm";

interface Props {
  balance: string | number;
  spotTokens: ISpotTokens[];
}

const HeaderForm: FC<Props> = ({ balance = "", spotTokens }) => {
  return (
    <Box sx={{
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px"
    }}>
      <Box>
        <Typography variant="body2"
                    color="textSecondary"
                    fontSize={"15px"}
                    fontWeight={"bold"}>
          Balance: <Box component={"span"} sx={{}}>${Number(balance).toFixed(2)}</Box>
        </Typography>

      </Box>
      <Box>
        {spotTokens && (
          spotTokens.map((it, index) => (
            <Box key={index}>
              <Box sx={{
                width: '160px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <Box component={"span"} sx={{
                  color: "#388e3c"
                }}>{it.symbol}</Box>
                <Box component={"span"} sx={{}}>{Number(it.rate).toFixed(4)}</Box>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default HeaderForm;