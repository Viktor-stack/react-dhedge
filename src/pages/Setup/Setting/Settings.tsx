import { useTheme } from "@mui/material/styles";
import { settingAPI } from "@RTK/Setup/setting.service";
import { useEffect, useMemo, useState } from "react";
import { ISetting } from "../../../redux/interface/Setup/ISetting";
import SettingMetaData, { ISettingMetaData } from "./SettingMetaData";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button/Button";
import { LayoutTable } from "@UI/MyTableContains/MyTable/styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "@UI/CustomToolbar/CustomToolbar";
import CustomPagination from "@UI/CustomPagination/CustomPagination";
import LinearProgress from "@mui/material/LinearProgress";
import CustomNoRowsOverlay from "@UI/CustomNoRowsOverlay/CustomNoRowsOverlay";
import ModalContainer from "@UI/ModalContainer/ModalContainer";
import UiForm from "@UI/UiForm/UiForm";
// import { IFormMeta } from "../../../redux/interface/Setup/IFormMeta";
import MyDrawer from "@UI/MyDrawer/MyDrawer";
import { SettingFormMeta } from "./SettingFormMeta";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MIN_WIDTH } from "../../../shared/configMedia/config";

const Settings = () => {
  const matches = useMediaQuery(MIN_WIDTH);
  const theme = useTheme();
  const [getData, { data: settingDate, isSuccess, isError }] = settingAPI.useLazySettingsFetchAllQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<ISetting[]>([]);
  const [updateObj, setUpdateObj] = useState({});
  const [title, setForm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [titleForm, setTitleForm] = useState<string>("");
  const [openChildDowers, setOpenChildDowers] = useState<boolean>(false);
  const [childArr, setChildArr] = useState([]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (settingDate) {
      setRows(settingDate.data);
      setIsLoading(!isSuccess);
    }
  }, [settingDate]);
  const handleOpenDrawer = (open: boolean, updateObj: any, title: string) => {
    // setChildArr(updateObj);
    // setOpenChildDowers(open);
    // setTitle(title);
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
  const { columns } = SettingMetaData({
    handleOpenDrawer,
    handleOpenModal,
    isSuccess
  } as ISettingMetaData);


  const handleCreate = () => {

  };

  const handleSubmit = async (data: any) => {
    if (titleForm === "Edit") {
      setUpdateObj(data);
    }
    if (titleForm === "Create") {
      setUpdateObj(data);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          currency: matches,
          chainId: matches
        }
      }
    }),
    [matches]
  );
  return (
    <>
      {isError && (
        <TransitionAlerts isOpen={isError} content={"Server Not found"} />
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
          Networks
        </Typography>
        <Button
          disabled
          onClick={handleCreate}
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
      <LayoutTable sx={{ height: "80vh" }}>
        <DataGrid
          showCellRightBorder={true}
          showColumnRightBorder={true}
          initialState={initialState}
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination,
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay
          }}
          density={matches ? "compact" : "standard"}
          // page={page}
          // rowsPerPageOptions={[Number(pageSize)]}
          // rowCount={totalCount}
          // pageSize={Number(pageSize)}
          // filterMode={"server"}
          // sortingMode="server"
          // paginationMode="server"
          // onPageChange={(newPage) => setPage(newPage)}
          // onPageSizeChange={(newPageSize) =>
          // 	setPageSize(newPageSize.toString())
          // }
          loading={isLoading}
          sx={{
            backgroundColor: `${theme.palette.background.paper}`,
            borderRadius: "15px",
            ".MuiDataGrid-cellContent": {
              fontSize: "14px"
            },
            ".MuiDataGrid-cell:focus": {
              outline: "solid #00ab55 1px"
            },
            ".MuiCircularProgress-root": {
              color: `${theme.palette.text.primary}`
            },
            ".MuiDataGrid-booleanCell[data-value=\"false\"]": {
              color: "rgba(234,5,5,0.98)"
            },
            ".MuiDataGrid-booleanCell[data-value=\"true\"]": {
              color: "rgb(2,168,68)",
              ".MuiSvgIcon-root": {
                width: "30px",
                height: "30px"
              }
            },
            ".MuiDataGrid-footerContainer": {
              justifyContent: "center"
            }
          }}
        />
        <ModalContainer open={open} handleClose={handleClose}>
          <UiForm
            formMeta={SettingFormMeta}
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

export default Settings;
