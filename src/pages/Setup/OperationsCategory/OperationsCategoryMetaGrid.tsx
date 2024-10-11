import React, {useMemo} from "react";
import {GridColumns} from "@mui/x-data-grid";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import {IOperationVolumes, IOperationsCategoryData} from "../../../redux/interface/Setup/IOperationsCategoryData";
import Checkbox from "@mui/material/Checkbox";

export interface SignalStrategiesMetaGridProps {
  isSuccessEventStrategies: boolean;
  signalStrategiesData: IOperationsCategoryData;
  data: any;
  submitData: (iOperationCategory: IOperationVolumes) => any
}

const OperationsCategoryMetaGrid = ({
                                      isSuccessEventStrategies,
                                      signalStrategiesData,
                                      data = {},
                                      submitData
                                    }: SignalStrategiesMetaGridProps) => {
  const checkHandler = (
    signalStrategiesData: IOperationsCategoryData,
    params: any
  ) => {
    return signalStrategiesData.operationCategories.find((it) => {
      return (
        it.category.id.toString() == params.field && it.operation.id === params.id
      );
    })?.composite;
  };

  const renderCheckbox = () => {

  }


  const columns: GridColumns = useMemo(() => {
    const columnsHead: GridColumns = [];
    if (isSuccessEventStrategies) {
      columnsHead.push({
        field: `key`,
        width: 250,
        filterable: false,
        headerName: "Key",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        renderHeader: () => <GridSotBtn width={"100vh"} headerName={"operation"}/>
      });
      for (let i = 0; i < signalStrategiesData.categories.length; i++) {
        // if (signalStrategiesData.operationCategories[i].composite) {
          columnsHead.push({
            field: `${signalStrategiesData.categories[i].id}`,
            minWidth: 55,
            flex: 1,
            headerName: `${signalStrategiesData.categories[i].key}`,
            filterable: false,
            type: "boolean",
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
              signalStrategiesData.operationCategories && (
                <Checkbox
                  sx={{
                    "&.Mui-disabled": {
                      color: "#66bb6a"
                    }
                  }}
                  color={"success"}
                  disabled={true}
                  checked={checkHandler(signalStrategiesData, params)}
                  // onClick={() => submitData(
                  //   signalStrategiesData.operationVolumes[i]
                  // )}
                />
              )
            ),
            renderHeader: () => (
              <GridSotBtn
                isStringTransform={true}
                width={"100vh"}
                headerName={signalStrategiesData.categories[i].key}
              />
            )
          });
        // }
      }
    }

    return columnsHead;
  }, [signalStrategiesData, data]);
  return {
    columns
  };
};

export default OperationsCategoryMetaGrid;
