import React, {useEffect, useMemo, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {poolAPI} from "@RTK/Setup/pool.service";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import {IPool, IPoolCreate} from "../../../redux/interface/Setup/IPool";
import useLocalStorage from "usehooks-ts/dist/esm/useLocalStorage/useLocalStorage";
import useTheme from "@mui/material/styles/useTheme";
import {networkAPI} from "@RTK/Setup/network.service";
import {useSnackbar} from "notistack";
import {GridColumns} from "@mui/x-data-grid";
import GridSotBtn from "@UI/GridSortBtn/GridSortBtn";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import ActionsButtonTable from "@UI/ActionButtonTable/ActionsButtonTable";
import {INetwork} from "../../../redux/interface/Setup/INetwork";
import ModalContainer from "@UI/ModalContainer/ModalContainer";
import UiForm from "@UI/UiForm/UiForm";
import {PoolFormMeta} from "./PoolFormMeta";
import {useHandlerMessage} from "../../../hooks/useHandlerMessage";
import {useErrorHandler} from "../../../hooks/useErrorHandler";
import {useCreateDataHook} from "../../../hooks/useCreateDataHook";
import MyDialog from "@UI/MyDialog/MyDialog";
import {DataGridInner} from "@UI/DataInner/DataInner";

type MyObject = {
  [key: string]: string;
};
const Pool = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [rows, setRows] = useState<IPool[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [titleForm, setTitleForm] = useState("");
  const [selectId, setSelectId] = useLocalStorage<number>("selectValueId", 1);
  const [updateObj, setUpdateObj] = useState<IPool | any>({
    id: 0,
    address: "",
    name: "",
    network: selectId
  });
  const [create, setCreate] = useState<IPoolCreate>({
    name: "",
    address: "",
    automatic: false,
    network: selectId
  });
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const {enqueueSnackbar} = useSnackbar();
  const {
    data: network,
    refetch: refetchNetwork
  } = networkAPI.useFetchNetworksSelectQuery();
  const {
    data: poolData,
    refetch,
    isLoading: isLoadingFetch,
    isSuccess: isSuccessPollData,
    error: poolDataIsError
  } = poolAPI.useFetchAllPoolsQuery({id: selectId}, {refetchOnFocus: true});
  const [isAlerts, setIsAlerts] = useState<boolean>(false);
  const {data: networkActive} = networkAPI.useFetchNetworksSelectQuery();

  const [
    updatePool,
    {
      data: updatePoolData,
      isSuccess: isSuccessPoolData
    }
  ] = poolAPI.useUpdatePoolMutation();

  const [
    createPool,
    {
      data: createResPool,
      error: errorPoll
    }
  ] = poolAPI.useCreatePoolMutation();

  const [
    deletePool,
    {
      data: deletePoolData,
      error: deletePoolDataError
    }
  ] = poolAPI.useDeletePoolsMutation();

  useHandlerMessage(deletePoolData)
  useHandlerMessage(updatePoolData);
  useErrorHandler(poolDataIsError);
  useErrorHandler(deletePoolDataError);
  useCreateDataHook(createResPool);
  useErrorHandler(errorPoll);

  useEffect(() => {
    if (poolData) {
      setRows(poolData.data);
      setTimeout(() => {
        setIsLoading(isLoadingFetch);
      }, 500);
    }
  }, [poolData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createHandler = () => {
    setOpen(true);
    setTitleForm("Create");
    setUpdateObj(create);
  };

  const selectHandler = (id: number) => {
    setSelectId(id);
    setTitleForm("Create");
  };
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

  const handlerDialogModal = (deleteObj: any) => {
    setIsAlerts(true);
    setUpdateObj(deleteObj)
  }
  const handlerActionDialog = async (type: boolean) => {
    if (type) {
      debugger
      deletePool({id: updateObj.id})
      setIsAlerts(false)
    } else {
      setIsAlerts(false)
    }
  }

  const columns: GridColumns = useMemo(() => {
    const columnsHead: GridColumns = [];
    const hideColumns: MyObject = {
      enabledLocked: "enabledLocked",
      networkEnabledLocked: "networkEnabledLocked",
      poolStrategies: "poolStrategies",
      poolTokens: "poolTokens"
    };
    if (!poolData?.data.length) return columnsHead;
    for (const poolDataKey in poolData.data[0]) {
      if (hideColumns[poolDataKey] === poolDataKey) {
        continue;
      }
      if (poolDataKey === "id") {
        columnsHead.push({
          field: "id",
          flex: 1,
          maxWidth: 60,
          resizable: false,
          filterable: false,
          align: "center",
          disableColumnMenu: true,
          sortable: false,
          renderHeader: () => (
            <GridSotBtn flex={1} width={"100vh"} headerName={"id"}/>
            // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
          )
        });
        continue;
      }
      if (poolDataKey === "automatic") {
        columnsHead.push({
          field: "automatic",
          type: "boolean",
          flex: 1,
          maxWidth: 100,
          align: "center",
          disableColumnMenu: true,
          filterable: false,
          resizable: false,
          sortable: false,
          renderHeader: () => (
            <GridSotBtn flex={1} width={"100vh"} headerName={poolDataKey}/>
            // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
          )
        });
        continue;
      }
      if (poolDataKey === "network") {
        columnsHead.push({
          field: poolDataKey,
          type: "string",
          flex: 1,
          maxWidth: 250,
          align: "center",
          disableColumnMenu: true,
          filterable: false,
          resizable: false,
          sortable: false,
          renderHeader: () => (
            <GridSotBtn flex={1} width={"100vh"} headerName={poolDataKey}/>
            // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
          ),
          renderCell: (params) => {
            let network = params.row.network as INetwork;
            return <div>{network.name}</div>;
          }
        });
        continue;
      }
      columnsHead.push({
        field: poolDataKey,
        align: "center",
        flex: 1,
        disableColumnMenu: true,
        filterable: false,
        resizable: false,
        sortable: false,
        renderHeader: () => (
          <GridSotBtn flex={1} width={"100vh"} headerName={poolDataKey}/>
          // isArrLength={isArrLength} handleSortRes={async (value) => sortHandler(value)}
        )
      });
    }
    columnsHead.push({
      field: "actions",
      type: "actions",
      width: 150,
      minWidth: 90,
      align: "center",
      renderCell: (params) => (
        <ActionsButtonTable isActiveDeleteBtn={true}
                            {...{params, handleOpenModal, handleOpenDrawer, handlerDialogModal}}
        />
      )
    });
    return columnsHead;
  }, [rows]);

  const handleClose = () => {
    setOpen(false);
  };

  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          network: matches,
          currency: matches,
          address: matches,
          createdAt: matches,
          updatedAt: matches
        }
      }
    }),
    [matches]
  );

  const handleSubmit = async (data: any) => {
    if (titleForm === "Edit") {
      await updatePool(data);
    }
    if (titleForm === "Create") {
      await createPool(data);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "5px",
          mb: "5px",
          overflow: 'hidden'
        }}>

        <Typography textAlign={"center"} fontWeight="bold" variant="h4">
          Pools
        </Typography>
        <Button
          onClick={createHandler}
          sx={{
            marginRight: "20px",
            height: "25px",
            fontWeight: "bold"
          }}
          color={`success`}
          variant={"contained"}>
          Create
        </Button>
      </Box>
      <>
        {poolDataIsError ? (
          <TransitionAlerts isOpen={true} content={"Data not found"}/>
        ) : (
          poolData?.data.length === 0 && (
            <TransitionAlerts isOpen={true} content={"Poll Data not found"}/>
          )
        )}
        <LayoutTable sx={{height: "80vh"}}>
          <DataGridInner
            initialState={initialState}
            columns={columns}
            rows={rows}
            isLoading={isLoading}
          />
          <ModalContainer open={open} handleClose={handleClose}>
            <UiForm
              onOpen={setOpen}
              formData={updateObj}
              titleForm={titleForm}
              formMeta={PoolFormMeta}
              selectData={networkActive}
              onSubmitForm={(data) => handleSubmit(data)}
            />
          </ModalContainer>
          {isAlerts && (
            <MyDialog
              message={"Are you sure you want to perform this action?"}
              onDialog={handlerActionDialog}
              zIndex={2300}
            />
          )}
        </LayoutTable>
      </>
    </>
  );
};

export default Pool;
