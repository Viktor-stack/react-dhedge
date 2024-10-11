import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {IMarketCategoryData} from "../../../redux/interface/Setup/IMarketCategory";

export const renderCheckbox = (
  marketCategoryData: IMarketCategoryData,
  handleSubmit: Function,
  params: GridRenderCellParams
) => (
  marketCategoryData.marketCategories && (
    <Checkbox
      // onClick={() =>
      //   handleSubmit(
      //     marketCategoryData.marketCategories.find(
      //       (i) =>
      //         i.firstCategory.id.toString() === params.field &&
      //         i.lastCategory.id === params.id
      //     )
      //   )
      // }
      color={"success"}
      // disabled={true}
      disabled={
        !!marketCategoryData.marketCategories.find(
          (i) => i.firstCategory.id === i.lastCategory.id
        )
      }
      sx={{
        "&.Mui-disabled": {
          color: "#66bb6a"
        }
      }}
      checked={
        marketCategoryData.marketCategories.find(
          (i) =>
            i.firstCategory.id.toString() === params.field &&
            i.lastCategory.id === params.id
        )?.enabled
      }
    />
  )
);
