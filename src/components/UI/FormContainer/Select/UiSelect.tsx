import * as React from "react";
import { FC, useLayoutEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { strUtils } from "../../../../shared/utils";
import Box from "@mui/material/Box";
interface UiSelectProps {
  selectNode?: any[];
  field: string;
  handleInput: (filed: string, value?: any) => void;
  data: string | number;
  setDirty: (value: boolean) => void;
  titleForm: string;
  configFiled?: any;
  isDisabled?: boolean
}

const UiSelect: FC<UiSelectProps> = ({
  selectNode = [],
  field,
  data = "",
  handleInput,
  setDirty,
  titleForm,
  configFiled = {},
  isDisabled
}) => {
  const [selectState, setSelectState] = useState<string | number>("");
  const [selectLabel, setSelectLabel] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<typeof selectState>) => {
    setDirty(false);
    const {
      target: { value }
    } = event;
    setSelectState(value);
    if (selectNode) {
      handleInput(field, selectNode.filter((item) => item.id === +value)[0]);
    }
  };

  useLayoutEffect(() => {
    setSelectLabel(strUtils(field, { [field]: field }));
  }, [field]);

  useLayoutEffect(() => {
    setSelectState(data);
  }, [data]);

  const handleFiledDisabled = (key: string): boolean => {
    if (titleForm === "Create") {
      return false;
    }
    return key === configFiled[key];
  };
  const render = () => {
    if (selectNode.length || selectState === "") {
      return selectNode.map(({ name, id, enabled }, index) => (
        <MenuItem key={index} value={id}>
          {name}
        </MenuItem>
      ));
    }
  };

  return (
    <Box
      sx={{
        height: "40px",
        minWidth: "200px"
      }}>
      <FormControl size={"small"} sx={{ paddingLeft: 0, width: "100%" }}>
        <InputLabel
          size={"small"}
          shrink
          color="success"
          id="demo-multiple-name-label">
          {selectLabel}
        </InputLabel>
        {selectNode.length !== 0 && (
          <Select
            size={"small"}
            defaultValue={selectState}
            key={selectState}
            disabled={titleForm === "View" || handleFiledDisabled(field) || isDisabled}
            color="success"
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selectState}
            onChange={handleChange}
            input={<OutlinedInput label={selectLabel} />}>
            {render()}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export default UiSelect;
