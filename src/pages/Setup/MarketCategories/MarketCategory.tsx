import React, {useEffect, useState} from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useHandlerMessage} from "../../../hooks/useHandlerMessage";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import {IMarketCategoryData} from "../../../redux/interface/Setup/IMarketCategory";
import {marketCategoryAPI} from "@RTK/Setup/marketCategory.service";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import {DataGridInner} from "@UI/DataInner/DataInner";
import MarketCategoryMetaGrid, {MarketCategoryMetaGridProps} from "./MarketCategoryMetaGrid";

const MarketCategory = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<IMarketCategoryData>({
    firstCategories: [],
    lastCategories: [],
    marketCategories: []
  });
  const {
    data: marketCategoryData,
    isLoading: isLoadingFetch,
    isSuccess: isSuccessMarketCategory,
    isError: marketCategoryDataIsError,
  } = marketCategoryAPI.useAllMarketCategoryQuery();
  const [
    update,
    {data: updateData}
  ] = marketCategoryAPI.useUpdateMarketCategoryMutation();

  // useHandlerMessage(updateData);
  // useErrorHandler(marketCategoryError);

  useEffect(() => {
    if (marketCategoryData && marketCategoryData.data) {
      setData(marketCategoryData.data);
    }
    setTimeout(() => {
      setIsLoading(isLoadingFetch);
    }, 500);
  }, [marketCategoryData]);

  const submitData = (data: any) => {
    console.log(data)
  }

  const handleSubmit = (updateObj: any) => {
    // console.log(updateObj);
    update({
      id: updateObj?.id,
      key: updateObj?.key,
      name: updateObj?.name,
      dapp: updateObj?.dapp,
      firstCategory: updateObj?.firstCategory,
      lastCategory: updateObj?.lastCategory,
      operation: updateObj?.operation,
      enabled: !updateObj?.enabled
    });
    setIsLoading((prevState) => !prevState);
  };

  const {columns} = MarketCategoryMetaGrid({
    marketCategoryData: marketCategoryData?.data,
    isSuccessMarketCategory: isSuccessMarketCategory,
    data: data,
    submitData,
    handleSubmit
  } as MarketCategoryMetaGridProps);

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
          {marketCategoryData?.message}
        </Typography>
      </Box>
      {marketCategoryDataIsError ? (
        <TransitionAlerts
          isOpen={marketCategoryDataIsError}
          content={errorMessage}
        />
      ) : (
        <>
          {marketCategoryData?.data.firstCategories.length || isSuccessMarketCategory ? (
            marketCategoryData?.data.lastCategories.length || isSuccessMarketCategory ? (
              <LayoutTable sx={{height: "80vh"}}>
                <DataGridInner
                  columns={columns}
                  rows={data.lastCategories}
                  isLoading={isLoading}
                />
              </LayoutTable>
            ) : (
              <TransitionAlerts isOpen={true} content={"No active last categories"}/>
            )
          ) : (
            <TransitionAlerts isOpen={true} content={"No active first categories"}/>
          )}
        </>
      )}
    </>
  );

};

export default MarketCategory;