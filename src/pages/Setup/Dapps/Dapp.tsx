import {useEffect, useMemo, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import useTheme from "@mui/material/styles/useTheme";
import {IDapp, IDappCreate} from "../../../redux/interface/Setup/IDapp";
import {dappAPI} from "@RTK/Setup/dapp.service";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import ModalContainer from "@UI/ModalContainer/ModalContainer";
import MyDrawer from "@UI/MyDrawer/MyDrawer";
import useLocalStorage from "usehooks-ts/dist/esm/useLocalStorage/useLocalStorage";
import UiForm from "@UI/UiForm/UiForm";
import {DappFormMeta} from "./DappFormMeta";
import {useHandlerMessage} from "../../../hooks/useHandlerMessage";
import {useErrorHandler} from "../../../hooks/useErrorHandler";
import {useSelectDappId} from "../../../hooks/useSelectDappId";
import {useCreateDataHook} from "../../../hooks/useCreateDataHook";
import DappMetaDataGrid, {DappMetaDataGridProps} from "./DappMetaDataGrid";
import {DataGridInner} from "@UI/DataInner/DataInner";

const Dapp = () => {
  const matches = useMediaQuery(MIN_WIDTH);
  const theme = useTheme();
  const [rows, setRows] = useState<IDapp[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openChildDowers, setOpenChildDowers] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [pageSize, setPageSize] = useLocalStorage(
  //   "pageSize",
  //   localStorage.getItem("pageSize")
  // );
  const [updateObj, setUpdateObj] = useState({});
  const [childArr, setChildArr] = useState([]);
  const [titleForm, setTitleForm] = useState("");
  const [title, setTitle] = useState("");
  const [value, setSelectId] = useLocalStorage<number | undefined>(
    "selectValueId",
    1
  );
  const [totalCount, setTotalCount] = useState(0);
  const [create] = useState<IDappCreate>({
    key: "",
    name: "",
    minSlippage: 0,
    maxSlippage: 0,
    stepSlippage: 0
  });

  // const {handleSortModelChange, arrSortModel, resetSortHandler, isArrLength} = useSortHooks()

  const {
    data: dappData,
    isSuccess,
    isError,
    refetch
  } = dappAPI.useFetchAllDappQuery();
  const [
    updateDapp,
    {
      data: updateData,
      error: updateDataError
    }
  ] = dappAPI.useUpdateDappMutation();
  const [
    createDapp,
    {
      data: createData,
      isSuccess: isSuccessUpdate,
      isError: createDataIsError,
      error: createDataError
    }
  ] = dappAPI.useCreateDappMutation();

  useEffect(() => {
    if (dappData) {
      setRows(dappData.data);
      setSelectId(value)
      // setTotalCount(data?.data.totalCount)
      setIsLoading(!isSuccess);
    }
  }, [dappData]);

  useSelectDappId({updateData, data: dappData?.data, setSelectId});
  useHandlerMessage(updateData);
  useErrorHandler(createDataError);
  useCreateDataHook(createData);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOpenModal = (
    open: boolean,
    updateObj: any,
    titleForm: string
  ) => {
    setUpdateObj(updateObj);
    setTitleForm(titleForm);
    setOpen(open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDrawer = (open: boolean, updateObj: any, title: string) => {
    setChildArr(updateObj);
    setOpenChildDowers(open);
    setTitle(title);
  };

  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          key: matches,
          name: matches,
          minSlippage: matches,
          maxSlippage: matches,
          stepSlippage: matches,
        }
      }
    }),
    [matches]
  );

  const handleSubmit = async (value: any) => {
    setOpen(false);
    if (titleForm === "Edit") {
      await updateDapp(value);
    }
    if (titleForm === "Create") {
      await createDapp(value);
    }
  };

  const {columns} = DappMetaDataGrid({
    handleOpenDrawer,
    handleOpenModal,
    isSuccess
  } as DappMetaDataGridProps);

  const createHandler = () => {
    setOpen(true);
    setUpdateObj(create);
    setTitleForm("Create");
  };
  return (
    <>
      {isError && (
        <TransitionAlerts isOpen={isError} content={"Server Not found"}/>
      )}
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
          Dapps
        </Typography>
        <Button
          disabled={true}
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
      <LayoutTable sx={{height: "80vh"}}>
        <DataGridInner
          initialState={initialState}
          columns={columns}
          rows={rows}
          isLoading={isLoading}
        />
        <ModalContainer open={open} handleClose={handleClose}>
          <UiForm
            formMeta={DappFormMeta}
            formData={updateObj}
            titleForm={titleForm}
            onSubmitForm={(data) => handleSubmit(data)}
            onOpen={setOpen}
          />
        </ModalContainer>
        <MyDrawer
          configFieldsVisible={{
            createdAt: false
          }}
          title={title}
          open={openChildDowers}
          arr={childArr}
          onCloseDrawer={handleOpenDrawer}
        />
      </LayoutTable>
    </>
  );
};
export default Dapp;