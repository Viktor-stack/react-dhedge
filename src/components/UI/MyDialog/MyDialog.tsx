import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import {Divider, SliderValueLabelProps} from "@mui/material";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import {PrettoSlider} from "@UI/PrettoSlider/PrettoSlider";
import Tooltip from "@mui/material/Tooltip";
import {StyleButton} from "@UI/MyDialog/style";

interface MyDialogProps {
  message: string;
  onDialog: (event: boolean, percent: number) => void;
  zIndex?: number
}

function ValueLabelComponent(props: SliderValueLabelProps) {
  const {children, value} = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const MyDialog: FC<MyDialogProps> = ({message, onDialog, zIndex}) => {
  function valueLabelFormat(value: number) {
    const units = ['%'];

    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 1024 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 1024;
    }

    return `${scaledValue} ${units[unitIndex]}`;
  }

  const [rangePercentage, setRangePercentage] = useState<number>(0)
  const tneme = useTheme();
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setRangePercentage(newValue);
    }
  };
  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          borderRadius: "10px",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.49)",
          transition: "all 1s",
          zIndex: zIndex
        }}>
        <IconButton></IconButton>
        <Paper
          square={false}
          variant={"outlined"}
          elevation={0}
          sx={{
            width: "500px",
            height: "400px"
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "75%",
              flexDirection: 'column'
            }}>
            <h2
              style={{
                textAlign: "center"
              }}>
              {message}
            </h2>
            <Box sx={{
              width: '250px'
            }}>
              <PrettoSlider
                sx={{
                  color: tneme.palette.success.dark
                }}
                slots={{
                  valueLabel: ValueLabelComponent,
                }}
                value={rangePercentage}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={0}
                valueLabelFormat={valueLabelFormat}
              />
            </Box>
            <Box sx={{
              width: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <Button sx={StyleButton} onClick={() => setRangePercentage(25)} variant={"contained"} color={'success'}>
                25%
              </Button>
              <Button sx={StyleButton} onClick={() => setRangePercentage(33)} variant={"contained"} color={'success'}>
                33%
              </Button>
              <Button sx={StyleButton} onClick={() => setRangePercentage(50)} variant={"contained"} color={'success'}>
                50%
              </Button>
              <Button sx={StyleButton} onClick={() => setRangePercentage(100)} variant={"contained"} color={'success'}>
                100%
              </Button>
            </Box>
          </Box>

          <Divider/>

          <Box
            sx={{
              height: "25%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Button
              onClick={() => onDialog(true, rangePercentage)}
              sx={{
                marginRight: "15px",
                fontWeight: "bold",
                fontSize: "20px"
              }}
              disabled={rangePercentage === 0}
              color={"success"}
              fullWidth
              variant={"contained"}>
              yes
            </Button>
            <Button
              sx={{
                fontWeight: "bold",
                fontSize: "20px"
              }}
              onClick={() => onDialog(false,rangePercentage)}
              color={"error"}
              fullWidth
              variant={"contained"}>
              No
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default MyDialog;
