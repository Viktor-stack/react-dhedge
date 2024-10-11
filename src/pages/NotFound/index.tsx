import { FC } from "react";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import { ReactComponent as NoteFound404 } from "../../assets/NotFound/illustration_404.svg";
import Typography from "@mui/material/Typography";

const NotFound: FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: `88vh`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <Box
        sx={{
          display: "flex",
          padding: "25px",
          flexDirection: "column",
          minWidth: "370px",
          height: "580px",
          alignItems: "center",
          justifyContent: "center",
          gap: "80px",
          borderRadius: "25px",
          boxShadow:
            "rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px",
          background: `${theme.palette.background.paper}`
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}>
          <Typography
            sx={{
              m: 2
            }}
            fontSize={"32px"}
            fontWeight="bold"
            variant="h1">
            Sorry, page not found!
          </Typography>
          <Typography
            lineHeight={"24px"}
            component={"span"}
            fontSize={"16px"}
            fontWeight={"400"}
            textAlign={"center"}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>
        </Box>
        <NoteFound404 />
      </Box>
    </Box>
  );
};

export default NotFound;
