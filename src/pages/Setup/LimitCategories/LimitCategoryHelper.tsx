import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {ILimitCategoryData} from "../../../redux/interface/Setup/ILimitCategory";

export const renderCheckbox = (
  limitCategoryData: ILimitCategoryData,
  handleSubmit: Function,
  params: GridRenderCellParams
) => (
  limitCategoryData.limitCategories && (
    <Checkbox
      // onClick={() =>
      //   handleSubmit(
      //     limitCategoryData.limitCategories.find(
      //       (i) =>
      //         i.firstCategory.id.toString() === params.field &&
      //         i.lastCategory.id === params.id
      //     )
      //   )
      // }
      color={"success"}
      disabled={true}
      sx={{
        "&.Mui-disabled": {
          color: "#66bb6a"
        }
      }}
      checked={
        !!limitCategoryData.limitCategories.find(
          (i) =>
            i.firstMarketCategory.id.toString() === params.field &&
            i.lastMarketCategory.id === params.id
        )?.enabled
      }
    />
  )
);
