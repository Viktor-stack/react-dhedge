import React, {useEffect, useMemo, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {networkAPI} from "@RTK/Setup/network.service";
import {IToken, ITokenCreate} from "../../../redux/interface/Setup/IToken";
import {tokenAPI} from "@RTK/Setup/token.service";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import useLocalStorage from "usehooks-ts/dist/esm/useLocalStorage/useLocalStorage";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import useTheme from "@mui/material/styles/useTheme";
import ModalContainer from "@UI/ModalContainer/ModalContainer";
import UiForm from "@UI/UiForm/UiForm";
import {TokenMetaFrom} from "./TokenMetaFrom";
import TokenMetaDataGrid, {TokenMetaDataGridProps} from "./TokenMetaDataGrid";
import {useHandlerMessage} from "../../../hooks/useHandlerMessage";
import {useErrorHandler} from "../../../hooks/useErrorHandler";
import {categoryAPI} from "@RTK/Setup/category.service";
import {DataGridInner} from "@UI/DataInner/DataInner";

const Token = () => {
  const matches = useMediaQuery(MIN_WIDTH);
  const theme = useTheme();
  const [selectId, setSelectId] = useLocalStorage<number>("selectValueId", 1);
  const [updateObj, setUpdateObj] = useState<IToken | {}>({});
  const [titleForm, setTitleForm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const {data: networkActive} = networkAPI.useFetchNetworksSelectQuery();
  const [selectNetwork, setSelectNetwork] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<IToken[]>([]);
  const {
    data: dataToken,
    isError: dataTokenIsError,
    isLoading: dataTokenIsLoading,
    isSuccess: dataTokenIsSuccess,
    refetch
  } = tokenAPI.useFetchAllTokenQuery(
    // {
    //   id: selectId
    // },
    // {
    //   refetchOnFocus: true,
    //   refetchOnReconnect: true,
    //   refetchOnMountOrArgChange: true
    // }
  );
  const [create, setCreate] = useState<ITokenCreate>({
    network: selectId,
    category: "",
    wrappedToken: "",
    name: "",
    symbol: "",
    address: "",
    decimals: 0,
    imageUrl: "",
    maxTxAmountBuy: 0.0,
    maxTxAmountSell: 0.0,
    maxTxRelation: 0.0,
    multiFactor: 1,
    enabled: false
  });
  const [
    createToken,
    {
      data: createRes,
      error: createError
    }
  ] = tokenAPI.useCreateTokenMutation();
  const [
    patchToken,
    {
      data: updateToken,
      error: updateError
    }
  ] = tokenAPI.useUpdateTokenMutation();
  const {data: categoryData} = categoryAPI.useAllCategoryQuery();
  const {data: wrappedTokenData} = tokenAPI.useFetchAllTokenQuery();

  useHandlerMessage(updateToken);
  useHandlerMessage(createRes);
  useErrorHandler(updateError);
  useErrorHandler(createError);

  useEffect(() => {
    if (dataToken) {
      setData(dataToken.data);
    }
  }, [dataToken]);

  useEffect(() => {
    if (networkActive) {
      setSelectNetwork(networkActive.filter((it) => it.id === selectId));
    }
  }, [networkActive, selectId]);

  useEffect(() => {
    refetch();
  }, []);
  const handleOpenModal = (
    open: boolean,
    updateObj: any,
    titleForm: string
  ) => {
    setUpdateObj(updateObj);
    setTitleForm(titleForm);
    setOpen(open);
  };
  const handleOpenDrawer = (open: boolean, updateObj: any, title: string) => {
    // setChildArr(updateObj);
    // setOpenChildDowers(open);
    // setTitle(title);
  };

  const {columns} = TokenMetaDataGrid({
    handleOpenModal,
    handleOpenDrawer,
    isSuccess: dataTokenIsSuccess
  } as TokenMetaDataGridProps);

  const selectHandler = (id: number) => {
    setSelectId(id);
    setCreate({
      ...create,
      network: id
    } as ITokenCreate);

    refetch();
  };

  const createHandler = () => {
    setOpen(true);
    setUpdateObj(create);
    setTitleForm("Create");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: any) => {
    if (titleForm === "Edit") {
      await patchToken(data);
    }
    if (titleForm === "Create") {
      debugger;
      await createToken(data);
    }
  };
  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          // name: matches,
          symbol: matches,
          network: matches,
          category: matches,
          wrappedToken: matches,
          address: matches,
          decimals: matches,
        }
      }
    }),
    [matches]
  );

  return (
    <>
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "5px",
          mb: "5px"
        }}>
        <Typography textAlign={"center"} fontWeight="bold" variant="h4">
          Tokens
        </Typography>
        <Button
          onClick={createHandler}
          sx={{
            marginLeft: "15px",
            marginRight: "15px",
            height: "25px",
            fontWeight: "bold"
          }}
          color={`success`}
          variant={"contained"}>
          Create
        </Button>
      </Box>
      {dataTokenIsError ? (
        <TransitionAlerts isOpen={dataTokenIsError} content={errorMessage}/>
      ) : (
        <LayoutTable sx={{height: "80vh"}}>
          <DataGridInner
            initialState={initialState}
            columns={columns}
            rows={data}
            isLoading={dataTokenIsLoading}
          />
          <ModalContainer open={open} handleClose={handleClose}>
            <UiForm
              onOpen={setOpen}
              formData={updateObj}
              titleForm={titleForm}
              formMeta={TokenMetaFrom}
              selectData={selectNetwork}
              selectData2={categoryData?.data}
              selectData3={wrappedTokenData?.data}
              // radioArr={Dapps}
              onSubmitForm={(data) => handleSubmit(data)}
            />
          </ModalContainer>
        </LayoutTable>
      )}
    </>
  );
};

export default Token;
