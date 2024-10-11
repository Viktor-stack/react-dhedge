import {IMarketCategory, IMarketCategoryData} from "../../../redux/interface/Setup/IMarketCategory";
import {GridColumns} from "@mui/x-data-grid";
import React, {useMemo} from "react";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import {renderCheckbox} from "./MarketCategoryHelper";

export interface MarketCategoryMetaGridProps {
  marketCategoryData: IMarketCategoryData;
  isSuccessMarketCategory: boolean;
  data: any;
  submitData: (iMarketCategory: IMarketCategory) => any,
  handleSubmit: any
}

const MarketCategoryMetaGrid =
  ({
     marketCategoryData,
     isSuccessMarketCategory,
     data = {},
     submitData,
     handleSubmit
  }: MarketCategoryMetaGridProps) => {

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
      if (isSuccessMarketCategory) {
        columnsHead.push({
          field: `name`,
          width: 250,
          filterable: false,
          headerName: "Name",
          align: "center",
          sortable: false,
          disableColumnMenu: true,
          renderHeader: () => <GridSotBtn width={"100vh"} headerName={"category"}/>
        });
        for (let i = 0; i < marketCategoryData.firstCategories.length; i++) {
          columnsHead.push({
            field: `${marketCategoryData.firstCategories[i].id}`,
            minWidth: 55,
            flex: 1,
            headerName: `${marketCategoryData.firstCategories[i].key}`,
            filterable: false,
            type: "boolean",
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
              renderCheckbox(marketCategoryData, handleSubmit, params)

              /*
              marketCategoryData.marketCategories && (
                <Checkbox
                  sx={{
                    "&.Mui-disabled": {
                      color: "#66bb6a"
                    }
                  }}
                  color={"success"}
                  disabled={true}
                  checked={checkHandler(marketCategoryData, params)}
                  // onClick={() => submitData(
                  //   marketCategoryData.marketCategories[i]
                  // )}
                />
              )
               */
            ),
            renderHeader: () => (
              <GridSotBtn
                isStringTransform={true}
                width={"100vh"}
                headerName={marketCategoryData.firstCategories[i].name}
              />
            )
          });
          // }
        }
      }

      return columnsHead;
    }, [marketCategoryData, data]);
    return {
      columns
    };
  };

export default MarketCategoryMetaGrid;