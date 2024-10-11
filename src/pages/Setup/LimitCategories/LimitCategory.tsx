import React, {useEffect, useState} from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import {ILimitCategoryData} from "../../../redux/interface/Setup/ILimitCategory";
import {limitCategoryAPI} from "@RTK/Setup/limitCategory.service";
import LimitCategoryMetaGrid, {LimitCategoryMetaGridProps} from "./LimitCategoryMetaGrid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import {DataGridInner} from "@UI/DataInner/DataInner";

const LimitCategory = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<ILimitCategoryData>({
    firstMarketCategories: [],
    lastMarketCategories: [],
    limitCategories: []
  });
  const {
    data: limitCategoryData,
    isLoading: isLoadingFetch,
    isSuccess: isSuccessLimitCategory,
    isError: limitCategoryDataIsError,
  } = limitCategoryAPI.useAllLimitCategoryQuery();
  const [
    update,
    { data: updateData }
  ] = limitCategoryAPI.useUpdateMarketCategoryMutation();

  useEffect(() => {
    if (limitCategoryData && limitCategoryData.data) {
      setData(limitCategoryData.data);
    }
    setTimeout(() => {
      setIsLoading(isLoadingFetch);
    }, 500);
  }, [limitCategoryData]);

  const submitData = (data: any) => {
    console.log(data)
  }

  const handleSubmit = (updateObj: any) => {
    // console.log(updateObj);
    update({
      id: updateObj?.id,
      firstMarketCategory: updateObj?.firstMarketCategory,
      lastMarketCategory: updateObj?.lastMarketCategory,
      enabled: !updateObj?.enabled
    });
    setIsLoading((prevState) => !prevState);
  };

  const {columns} = LimitCategoryMetaGrid({
    limitCategoryData: limitCategoryData?.data,
    isSuccessLimitCategory: isSuccessLimitCategory,
    data: data,
    submitData,
    handleSubmit
  } as LimitCategoryMetaGridProps);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "5px",
          mb: "5px"
        }}>
        <Typography textAlign={"center"} fontWeight="bold" variant="h4">
          {limitCategoryData?.message}
        </Typography>
      </Box>
      {limitCategoryDataIsError ? (
        <TransitionAlerts
          isOpen={limitCategoryDataIsError}
          content={errorMessage}
        />
      ) : (
        <>
          {limitCategoryData?.data.firstMarketCategories.length || isSuccessLimitCategory ? (
            limitCategoryData?.data.lastMarketCategories.length || isSuccessLimitCategory ? (
              <LayoutTable sx={{height: "80vh"}}>
                <DataGridInner
                  columns={columns}
                  rows={data.lastMarketCategories}
                  isLoading={isLoading}
                />
              </LayoutTable>
            ) : (
              <TransitionAlerts isOpen={true} content={"No active last market categories"}/>
            )
          ) : (
            <TransitionAlerts isOpen={true} content={"No active first market categories"}/>
          )}
        </>
      )}
    </>
  );

};

export default LimitCategory;