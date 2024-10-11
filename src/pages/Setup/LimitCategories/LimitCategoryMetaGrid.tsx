import {GridColumns} from "@mui/x-data-grid";
import React, {useMemo} from "react";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import {ILimitCategory, ILimitCategoryData} from "../../../redux/interface/Setup/ILimitCategory";
import {renderCheckbox} from "./LimitCategoryHelper";

export interface LimitCategoryMetaGridProps {
  limitCategoryData: ILimitCategoryData;
  isSuccessLimitCategory: boolean;
  data: any;
  submitData: (iLimitCategory: ILimitCategory) => any,
  handleSubmit: any
}

const LimitCategoryMetaGrid =
  ({
     limitCategoryData,
     isSuccessLimitCategory,
     data = {},
     submitData,
     handleSubmit
  }: LimitCategoryMetaGridProps) => {

  /*
    const checkHandler = (
      marketCategoryData: IMarketCategoryData,
      params: any
    ) => {
      return marketCategoryData.marketCategories.find((it) => {
        return it.firstCategory.id.toString() === params.field && it.lastCategory.id === params.id;
      })?.enabled;
    };
   */


    // const renderCheckbox = () => {
    //
    // }

    const columns: GridColumns = useMemo(() => {
      const columnsHead: GridColumns = [];
      if (isSuccessLimitCategory) {
        columnsHead.push({
          field: `key`,
          width: 150,
          filterable: false,
          headerName: "Key",
          align: "center",
          sortable: false,
          disableColumnMenu: true,
          renderHeader: () => <GridSotBtn width={"100vh"} headerName={"market category"}/>
        });
        for (let i = 0; i < limitCategoryData.firstMarketCategories.length; i++) {
          columnsHead.push({
            field: `${limitCategoryData.firstMarketCategories[i].id}`,
            minWidth: 55,
            flex: 1,
            headerName: `${limitCategoryData.firstMarketCategories[i].key}`,
            filterable: false,
            type: "boolean",
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
              renderCheckbox(limitCategoryData, handleSubmit, params)
              /*
              limitCategoryData.limitCategories && (
                <Checkbox
                  sx={{
                    "&.Mui-disabled": {
                      color: "#66bb6a"
                    }
                  }}
                  color={"success"}
                  disabled={true}
                  checked={checkHandler(limitCategoryData, params)}
                  // onClick={() => submitData(
                  //   limitCategoryData.limitCategories[i]
                  // )}
                />
              )
               */
            ),
            renderHeader: () =>
              <GridSotBtn
                isStringTransform={true}
                width={"100vh"}
                headerName={limitCategoryData.firstMarketCategories[i].key}
              />
          });
        }
      }
      return columnsHead;
    }, [limitCategoryData, data]);
    return {
      columns
    };
  };

export default LimitCategoryMetaGrid;