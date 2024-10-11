import { FC, useContext, useEffect, useState } from "react";
import { DirectionOfExchange } from "@UI/TradingForm/meta/IFormMeta";
import { Controller, set, SubmitHandler, useForm } from "react-hook-form";
import { ITypeEnums } from "../../../types/ITypeEnums";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
  Select,
  Slider,
  useTheme
} from "@mui/material";
import TextFields from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import HeaderForm from "@UI/TradingForm/ui/HeaderForm";
import FromCard from "@UI/TradingForm/ui/FromCard";
import FooterForm from "@UI/TradingForm/ui/FooterForm";
import ButtonForm from "@UI/TradingForm/ui/ButtonForm";
import { WebSocketContext } from "../../../shared/utils/websocket/WebSocketContext";
import { IMarketForm } from "../../../redux/interface/Trading/IMarketForm";
import UiSkeleton from "@UI/Skeleton/Skeleton";

export interface MarketFormProps {
  // onDialog: (event: boolean, percent: number) => void;
  // zIndex?: number
  onOpen: (isOpen: boolean) => void;
  formMeta?: DirectionOfExchange;
}

const selectToken = [
  {
    label: "USDC",
    value: "USDC"
  },
  {
    label: "WBTC",
    value: "WBTC"
  }
];
const selectSlippage = [
  {
    label: "0.1",
    value: "0.1"
  },
  {
    label: "0.3",
    value: "0.3"
  },
  {
    label: "0.5",
    value: "0.5"
  }
];
const marks = [
  {
    value: 25,
    label: "25%"
  },
  {
    value: 50,
    label: "50%"
  },
  {
    value: 75,
    label: "75%"
  },
  {
    value: 100,
    label: "100%"
  }
];

function valuetext(value: number) {
  return `${value}%`;
}

interface IDataForm {
  payWith: string;
  tokenFrom: {
    name: string
    id: number;
  };
  range: number;
  defaultTxRange: number;
  estimated: number;
  tokenTo: {
    name: string
    id: number;
  };
  slippage: number;
}

const MarketForm: FC<MarketFormProps> = ({ formMeta, onOpen }) => {
  const context = useContext(WebSocketContext);
  const theme = useTheme();
  const [valueRangeOne, setValueRangeOne] = useState(25);
  const [valueRangeTow, setValueRangeTow] = useState(25);
  const { handleSubmit, control, setValue, formState: { errors } } = useForm({ mode: "onTouched" });
  const [dataSocket, setDataSocket] = useState<IMarketForm | null>(null);
  // TODO Need create action button pool
  let dataEmit = {
    key: "sell_long",
    limitCategoryId: 1,
    marketCategoryId: 3,
    poolId: 1
  };
  const onSubmit: SubmitHandler<any> = (data: IDataForm) => {
    data.defaultTxRange = valueRangeTow;
    data.range = valueRangeOne;
    console.log(data);
  };

  useEffect(() => {
    context?.socket?.emit("market-create", JSON.stringify(dataEmit));
  }, [context.socket]);

  useEffect(() => {
    context?.socket?.on("market-response", (data) => {
      setDataSocket(data);
      setValue("payWithAmount", data.tokenFrom.payWithAmount);
      setValue("estimatedAmount", data.tokenTo.estimatedAmount);
    });
  }, [context.socket, dataSocket]);


  const renderSelectTokenFrom = () => {
    return dataSocket?.tokenFrom.selectTokens.map(({ id, name }, index) => (
      <MenuItem key={index} value={id}>
        {name}
      </MenuItem>
    ));
  };
  const renderSelectTokenTo = () => {
    return dataSocket?.tokenTo.selectTokens.map(({ id, name }, index) => (
      <MenuItem key={index} value={id}>
        {name}
      </MenuItem>
    ));
  };
  const renderSelectSlippageOptions = () => {
    return selectSlippage.map(({ label, value }, index) => (
      <MenuItem key={index} value={value}>
        {label}
      </MenuItem>
    ));
  };
  const handleSliderChangeOne = (_event: Event, newValue: number | number[]) => {
    setValueRangeOne(newValue as number);
  };
  const handleSliderChangeTow = (_event: Event, newValue: number | number[]) => {
    setValueRangeTow(newValue as number);
  };
  const handleInputChangeOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > 100) return;
    // @ts-ignore
    setValueRangeOne(event.target.value === "" ? 0 : Number(event.target.value++));
  };
  const handleInputChangeTow = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > 100) return;
    // @ts-ignore
    setValueRangeTow(event.target.value === "" ? 0 : Number(event.target.value++));
  };

  const handleBlur = () => {
    if (valueRangeOne < 0) {
      setValueRangeOne(0);
    } else if (valueRangeOne > 100) {
      setValueRangeOne(100);
    }
  };

  useEffect(() => {

  }, []);

  const selectHandlerFrom = (value = "") => {
    setValue("tokenFrom", value);
    console.log(value);
    context.socket?.emit("market-select-from", JSON.stringify({ id: value }));

  };
  const selectHandlerTo = (value = "") => {
    setValue("tokenTo", value);
    console.log(value);
    context.socket?.emit("market-select-to", JSON.stringify({ id: value }));
  };

  const inputHandlerFrom = (value = "") => {
    setValue("payWithAmount", value);
    setTimeout(() => {
      context.socket?.emit("market-amount-pay-with", JSON.stringify({ amount: value }));
    }, 1500);
  };

  const inputHandlerTo = (value = "") => {
    setValue("estimatedAmount", value);
    setTimeout(() => {
      context.socket?.emit("market-amount-estimated", JSON.stringify({ amount: value }));
    }, 1500);
  };



  const renderFormCardsFrom = () => {
    return formMeta?.tokenFrom.fields.map((it) => {
      switch (it.type) {
        case ITypeEnums.NUMBER:
          return (
            <Box sx={{
              width: "180px"
            }} key={it.fieldName}>
              <FormControl margin={"none"}>
                <Controller
                  defaultValue=""
                  control={control}
                  name={it.fieldName}
                  rules={{
                    required: it.validatorsProps?.required,
                    min: {
                      value: String(it.validatorsProps.min),
                      message: "Min length 1"
                    },
                    minLength: {
                      value: Number(it.validatorsProps.minLength),
                      message: "Min length 1"
                    },
                    maxLength: {
                      value: Number(it.validatorsProps.maxLength),
                      message: "Max length 12"
                    }
                  }}
                  render={({ field }) => (
                    <TextFields
                      variant="filled"
                      error={!!errors[it.fieldName]}
                      // helperText={
                      //   errors[it.fieldName] && it.validatorsProps.required
                      // }
                      size={"small"}
                      color={"success"}
                      fullWidth={true}
                      type={it.type}
                      name={field.name}
                      label={it.ladle}
                      onChange={(e) => inputHandlerFrom(e.target.value)}
                      onBlur={field.onBlur}
                      value={field.value}
                      inputRef={field.ref}
                    />
                  )}
                />
                <FormHelperText sx={{
                  opacity: `${errors[it.fieldName] ? "1" : "0"}`
                }} error>
                  {it.validatorsProps.required}
                </FormHelperText>
              </FormControl>
            </Box>
          );
        case ITypeEnums.SELECT:
          return (
            <Box sx={{
              width: "180px"
            }} key={it.fieldName}>
              <FormControl
                fullWidth
                margin={"none"}
              >
                <InputLabel
                  error={!!errors[it.fieldName]}
                  size={"small"}
                  color="success"
                  id="demo-multiple-name-label">
                  {it.ladle}
                </InputLabel>
                <Controller
                  defaultValue=""
                  control={control}
                  name={it.fieldName}
                  rules={{
                    required: it.validatorsProps.required
                  }}
                  render={({ field }) => (
                    <Select
                      error={!!errors[it.fieldName]}
                      defaultValue={it.fieldName}
                      disabled={it.disabled}
                      value={field.value?.id || field.value}
                      inputRef={field.ref}
                      onBlur={field.onBlur}
                      onChange={(e) => selectHandlerFrom(e.target.value)}
                      color="success"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-standard"
                      size={"small"}
                      input={<OutlinedInput label={it.ladle} />}>
                      {renderSelectTokenFrom()}
                    </Select>
                  )}
                />
                <FormHelperText sx={{
                  opacity: `${errors[it.fieldName] ? "1" : "0"}`
                }} error>
                  {it.validatorsProps.required}
                </FormHelperText>
              </FormControl>
            </Box>
          );
      }
    });
  };
  const renderFormCardsTo = () => {
    return formMeta?.tokenTo.fields.map(it => {
      switch (it.type) {
        case ITypeEnums.NUMBER:
          return (
            <Box sx={{
              width: "180px"
            }} key={it.fieldName}>
              <FormControl margin={"none"}>
                <Controller
                  control={control}
                  defaultValue=""
                  name={it.fieldName}
                  rules={{
                    required: it.validatorsProps?.required,
                    min: {
                      value: String(it.validatorsProps.min),
                      message: "Min length 1"
                    },
                    minLength: {
                      value: Number(it.validatorsProps.minLength),
                      message: "Min length 1"
                    },
                    maxLength: {
                      value: Number(it.validatorsProps.maxLength),
                      message: "Max length 12"
                    }
                  }}
                  render={({ field }) => (
                    <TextFields
                      variant="filled"
                      error={!!errors[it.fieldName]}
                      // helperText={
                      //   errors[it.fieldName] && it.validatorsProps.required
                      // }
                      size={"small"}
                      color={"success"}
                      fullWidth={true}
                      type={it.type}
                      name={field.name}
                      label={it.ladle}
                      onChange={(e) => inputHandlerTo(e.target.value)}
                      onBlur={field.onBlur}
                      value={field.value}
                      inputRef={field.ref}
                    />
                  )}
                />
                <FormHelperText sx={{
                  opacity: `${errors[it.fieldName] ? "1" : "0"}`
                }} error>
                  {it.validatorsProps.required}
                </FormHelperText>
              </FormControl>
            </Box>
          );
        case ITypeEnums.SELECT:
          return (
            <Box sx={{
              width: "180px"
            }} key={it.fieldName}>
              <FormControl
                fullWidth
                margin={"none"}
              >
                <InputLabel
                  error={!!errors[it.fieldName]}
                  size={"small"}
                  color="success"
                  id="demo-multiple-name-label">
                  {it.ladle}
                </InputLabel>
                <Controller
                  defaultValue=""
                  control={control}
                  name={it.fieldName}
                  rules={{
                    required: it.validatorsProps.required
                  }}
                  render={({ field }) => (
                    <Select
                      error={!!errors[it.fieldName]}
                      defaultValue={it.fieldName}
                      disabled={it.disabled}
                      value={field.value?.id || field.value}
                      inputRef={field.ref}
                      onBlur={field.onBlur}
                      onChange={(e) => selectHandlerTo(e.target.value)}
                      color="success"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-standard"
                      size={"small"}
                      input={<OutlinedInput label={it.ladle} />}>
                      {renderSelectTokenTo()}
                    </Select>
                  )}
                />
                <FormHelperText sx={{
                  opacity: `${errors[it.fieldName] ? "1" : "0"}`
                }} error>
                  {it.validatorsProps.required}
                </FormHelperText>
              </FormControl>
            </Box>
          );
      }
    });
  };
  const renderSelectSlippage = () => {
    return formMeta?.tokenTo.fields.map(it => {
      switch (it.type) {
        case ITypeEnums.SELECT_SLIPPAGE:
          return (
            <Box sx={{
              width: "180px"
            }} key={it.fieldName}>
              <FormControl
                fullWidth
                margin={"none"}
              >
                <InputLabel
                  error={!!errors[it.fieldName]}
                  size={"small"}
                  color="success"
                  id="demo-multiple-name-label">
                  {it.ladle}
                </InputLabel>
                <Controller
                  control={control}
                  name={it.fieldName}
                  defaultValue=""
                  rules={{
                    required: it.validatorsProps.required
                  }}
                  render={({ field }) => (
                    <Select
                      error={!!errors[it.fieldName]}
                      defaultValue=""
                      disabled={it.disabled}
                      value={field.value?.id || field.value}
                      inputRef={field.ref}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      color="success"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-standard"
                      size={"small"}
                      input={<OutlinedInput label={it.ladle} />}>
                      {renderSelectSlippageOptions()}
                    </Select>
                  )}
                />
                <FormHelperText sx={{
                  opacity: `${errors[it.fieldName] ? "1" : "0"}`
                }} error>
                  {it.validatorsProps.required}
                </FormHelperText>
              </FormControl>
            </Box>
          );
      }
    });
  };

  const renderFormCardsFromRange = () => {
    return formMeta?.tokenFrom.fields.map(it => {
      switch (it.type) {
        case ITypeEnums.SLIDER_ONE:
          return (
            <Box sx={{
              width: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }} key={it.fieldName}>
              <FormControl
                fullWidth
                size={"small"}
                margin={"none"}
              >
                <Controller
                  control={control}
                  name={it.fieldName}
                  rules={{
                    required: it.validatorsProps.required
                  }}
                  render={({ field }) => (
                    <Slider
                      min={25}
                      name={field.name}
                      color={"success"}
                      value={valueRangeOne}
                      onChange={handleSliderChangeOne}
                      aria-label="Restricted values"
                      getAriaValueText={valuetext}
                      step={null}
                      valueLabelDisplay="auto"
                      aria-labelledby="input-slider"
                      marks={marks}
                    />
                  )}
                />

                {errors[it.fieldName] && (
                  <FormHelperText error>
                    {it.validatorsProps.required}
                  </FormHelperText>
                )}
              </FormControl>
              <Box sx={{
                position: "relative"
              }}>
                <Input
                  sx={{ width: "65px", marginLeft: "35px" }}
                  value={valueRangeOne}
                  size="small"
                  type={"number"}
                  onBlur={handleBlur}
                  onChange={handleInputChangeOne}
                  inputProps={{
                    step: 0.1,
                    min: 0.1,
                    max: 100,
                    "aria-labelledby": "input-slider"
                  }}
                />
                <Box sx={{
                  right: 20,
                  top: 0,
                  position: "absolute"
                }} component={"span"}>
                  %
                </Box>
              </Box>
            </Box>
          );
        case ITypeEnums.SLIDER_TWO:
          return (
            <Box sx={{
              width: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }} key={it.fieldName}>
              <FormControl
                fullWidth
                size={"small"}
                margin={"none"}
              >
                <Controller
                  control={control}
                  name={it.fieldName}
                  rules={{
                    required: it.validatorsProps.required
                  }}
                  render={({ field }) => (
                    <Slider
                      min={25}
                      name={field.name}
                      color={"success"}
                      value={valueRangeTow}
                      onChange={handleSliderChangeTow}
                      aria-label="Restricted values"
                      getAriaValueText={valuetext}
                      step={null}
                      valueLabelDisplay="auto"
                      aria-labelledby="input-slider"
                      marks={marks}
                    />
                  )}
                />

                {errors[it.fieldName] && (
                  <FormHelperText error>
                    {it.validatorsProps.required}
                  </FormHelperText>
                )}
              </FormControl>
              <Box sx={{
                position: "relative"
              }}>
                <Input
                  sx={{ width: "65px", marginLeft: "35px" }}
                  value={valueRangeTow}
                  size="small"
                  type={"number"}
                  onBlur={handleBlur}
                  onChange={handleInputChangeTow}
                  inputProps={{
                    step: 0.1,
                    min: 0.1,
                    max: 100,
                    "aria-labelledby": "input-slider"
                  }}
                />
                <Box sx={{
                  right: 20,
                  top: 0,
                  position: "absolute"
                }} component={"span"}>
                  %
                </Box>
              </Box>
            </Box>
          );
      }
    });
  };

  return (
    <>
      {dataSocket === null ? <UiSkeleton width={"600px"} height={"690px"} /> : (
        <Box
          sx={{
            width: "100%  ",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.default,
            borderRadius: "10px",
            padding: "1rem"
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                width: "600px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                backgroundColor: theme.palette.background.default,
                borderRadius: "10px",
                padding: "1rem"
              }}
            >
              <HeaderForm balance={dataSocket?.pool.balance} defaultTx={"100 000"} usdcBalance={"999 785"} />
              <FromCard>
                {renderFormCardsFrom()}
                <Box sx={{
                  width: "100%",
                  display: "block"
                }}>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <Box sx={{
                      marginLeft: "15px"
                    }}>
                      {renderFormCardsFromRange()}
                    </Box>
                    <Box sx={{
                      marginLeft: "40px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}>
                      <Box sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: "bold",
                        fontSize: "20px",
                        padding: "20px"
                      }}>
                        $ 65 000
                      </Box>
                      <Box sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: "bold",
                        fontSize: "20px",
                        padding: "20px"
                      }}>
                        $100 000
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </FromCard>
              <FromCard>
                {renderFormCardsTo()}
                <Box sx={{
                  width: "100%",
                  display: "block",
                  marginTop: "10px"
                }}>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <Box>
                      {renderSelectSlippage()}
                    </Box>
                    <Box sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: "bold",
                      fontSize: "20px"
                    }}>
                      (0.20%) $669256
                    </Box>
                  </Box>
                </Box>
              </FromCard>
              <FooterForm txCommission={dataSocket.txCommission} maxFeePerGas={dataSocket.options.maxFeePerGas} />
              <ButtonForm onOpen={onOpen} />
            </Box>
          </form>
        </Box>)}

    </>
  );
};

export default MarketForm;