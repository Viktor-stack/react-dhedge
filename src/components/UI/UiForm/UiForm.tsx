import React, { FC } from "react";
import Box from "@mui/material/Box";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { Fields, IFormMeta } from "../../../redux/interface/Setup/IFormMeta";
import Typography from "@mui/material/Typography";
import { ITypeEnums } from "../../../redux/interface/Setup/ITypeEnums";
import TextFields from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

interface UiFormProps {
  formMeta: IFormMeta;
  formData: any;
  titleForm: string;
  onSubmitForm: (data: any) => void;
  onOpen: (isOpen: boolean) => void;
  selectData?: any[];
  selectData2?: any[];
  selectData3?: any[];
  // selectData4?: any[];
  radioArr?: any[];
}

const UiForm: FC<UiFormProps> = ({
  formMeta,
  formData = {},
  titleForm,
  onSubmitForm,
  onOpen,
  selectData = [],
  selectData2 = [],
  selectData3 = [],
  // selectData4 = [],
  radioArr = []
}) => {
  const theme = useTheme();
  const { fields } = formMeta;
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty, errors }
  } = useForm({ defaultValues: formData, mode: "onTouched" });


  const onSubmit: SubmitHandler<any> = (data: any) => {
    if (titleForm === "Create") {
      if (data["network"] || data["category"] || data["wrappedToken"]) {
        onSubmitForm({
          ...data,
          network: {
            id: +data.network
          },
          category: {
            id: +data.category
          },
          wrappedToken: {
            id: +data.wrappedToken
          }
        });
      } else {
        onSubmitForm({
          ...data
        });
      }
    }
    if (titleForm === "Edit") {
      onSubmitForm({
        id: formData.id,
        ...data
      });
    }
    onOpen(false);
  };

  const renderSelect1 = () => {
    if (selectData.length) {
      return selectData.map(({ name, id }, index) => (
        <MenuItem key={index} value={id}>
          {name}
        </MenuItem>
      ));
    }
  };
  const renderSelect2 = () => {
    const colorHandler = (name: string) => {
      switch (name) {
        case "Stable":
          return theme.palette.info.main;
        case "Spot":
          return theme.palette.success.dark;
        case "Long":
          return theme.palette.success.light;
        case "Short":
          return theme.palette.error.light;
      }
    };
    if (selectData2.length) {
      return selectData2.map(({ name, id }, index) => (
        <MenuItem key={index} value={id}>
          <Typography color={colorHandler(name)} fontWeight={"bold"}>
            {name.toUpperCase()}
          </Typography>
        </MenuItem>
      ));
    }
  };
  const renderSelect3 = () => {
    if (selectData3.length) {
      return selectData3.map(({ symbol, id }, index) => (
        <MenuItem key={index} value={id}>
          {symbol}
        </MenuItem>
      ));
    }
  };
  // const renderSelect4 = () => {
  //   if (selectData4.length) {
  //     return selectData4.map(({ name, id }, index) => (
  //       <MenuItem key={index} value={id}>
  //         {name}
  //       </MenuItem>
  //     ));
  //   }
  // };
  const renderFields = (fields: Fields[]) => {
    return fields.map((it) => {
      switch (it.type) {
        case ITypeEnums.TEXT:
          return (
            <FormControl margin={"dense"} key={it.fieldName} fullWidth>
              <Controller
                control={control}
                name={it.fieldName}
                rules={{
                  required: it.validatorsProps.required
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextFields
                    disabled={titleForm === "View" || it.disabled}
                    error={Boolean(errors[it.fieldName])}
                    size={"small"}
                    color={"success"}
                    helperText={
                      errors[it.fieldName] && it.validatorsProps?.required
                    }
                    fullWidth={true}
                    type={it.type}
                    name={field.name}
                    label={it.ladle}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                  />
                )}
              />
            </FormControl>
          );
        case ITypeEnums.NUMBER:
          return (
            <FormControl margin={"dense"} key={it.fieldName} fullWidth>
              <Controller
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
                    disabled={titleForm === "View"}
                    error={!!errors[it.fieldName]}
                    helperText={
                      errors[it.fieldName] && it.validatorsProps.required
                    }
                    size={"small"}
                    color={"success"}
                    fullWidth={true}
                    type={it.type}
                    name={field.name}
                    label={it.ladle}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    inputRef={field.ref}
                  />
                )}
              />
            </FormControl>
          );
        case ITypeEnums.BOOLEAN:
          return (
            <FormControl key={it.fieldName}>
              <Controller
                control={control}
                name={it.fieldName}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={titleForm === "View" || it.disabled}
                        color={"success"}
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        name={field.name}
                        inputRef={field.ref}
                      />
                    }
                    label={it.ladle}
                  />
                )}
              />
            </FormControl>
          );
        case ITypeEnums.SELECT:
          return (
            <FormControl
              fullWidth
              size={"small"}
              margin={"dense"}
              key={it.fieldName}>
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
                rules={{
                  required: it.validatorsProps.required
                }}
                render={({ field }) => (
                  <Select
                    error={!!errors[it.fieldName]}
                    defaultValue=""
                    disabled={it.disabled || titleForm === "View"}
                    value={field.value?.id || field.value}
                    inputRef={field.ref}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    color="success"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    size={"small"}
                    input={<OutlinedInput label={it.ladle} />}>
                    {it.fieldName === "network" && renderSelect1()}
                    {it.fieldName === "category" && renderSelect2()}
                    {it.fieldName === "wrappedToken" && renderSelect3()}
                  </Select>
                )}
              />
              {errors[it.fieldName] && (
                <FormHelperText error>
                  {it.validatorsProps.required}
                </FormHelperText>
              )}
            </FormControl>
          );
        case ITypeEnums.RADIO:
          return (
            <FormControl
              fullWidth
              size={"small"}
              margin={"dense"}
              key={it.fieldName}>
              <FormLabel
                color={"success"}
                id="demo-form-control-label-placement">
                {it.ladle}
              </FormLabel>
              <Controller
                control={control}
                rules={{
                  required: it.validatorsProps.required
                }}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      row
                      aria-labelledby="demo-form-control-label-placement"
                      name={it.fieldName}
                      defaultValue=""
                      value={field.value?.id || field.value}>
                      {radioArr.map((it, index) => (
                        <FormControlLabel
                          key={index}
                          disabled={titleForm === "View" || it.disabled}
                          onBlur={field.onBlur}
                          inputRef={field.ref}
                          onChange={field.onChange}
                          value={it.id}
                          control={<Radio color={"success"} />}
                          label={it.name}
                          labelPlacement="end"
                        />
                      ))}
                    </RadioGroup>
                  );
                }}
                name={it.fieldName}
              />
            </FormControl>
          );
        default:
          return <Box key={it.fieldName}>Fields INVALID</Box>;
      }
    });
  };

  return (
    <Box
      sx={{
        width: 900,
        backgroundColor: `${theme.palette.background.paper}`,
        padding: "15px",
        height: "100%",
        borderRadius: "15px"
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={"h6"}>{titleForm}</Typography>
        {renderFields(fields)}
        {(titleForm === "Edit" || titleForm === "Create") && (
          <FormControl size={"medium"} fullWidth>
            <Button
              sx={{
                marginTop: "15px",
                fontWeight: "bold"
              }}
              size={"large"}
              type={"submit"}
              disabled={!isDirty || !isValid}
              color={"success"}
              variant={"contained"}>
              {formMeta.btnTitle}
            </Button>
          </FormControl>
        )}
      </form>
    </Box>
  );
};

export default UiForm;
