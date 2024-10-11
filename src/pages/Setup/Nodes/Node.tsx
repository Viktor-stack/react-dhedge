import React, {useEffect, useMemo, useState} from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MIN_WIDTH} from "../../../shared/configMedia/config";
import TransitionAlerts from "@UI/TransitionAlerts/TransitionAlerts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {LayoutTable} from "@UI/MyTableContains/MyTable/styles/styles";
import ModalContainer from "@UI/ModalContainer/ModalContainer";
import UiForm from "@UI/UiForm/UiForm";
import {nodesAPI} from "@RTK/Setup/node.service";
import NodeMetaDataGrid, {NodeMetaDataGridProps} from "./NodeMetaDataGrid";
import {INode, INodeCreate} from "../../../redux/interface/Setup/INode";
import {NodeFormMeta} from "./NodeFormMeta";
import {networkAPI} from "@RTK/Setup/network.service";
import {useHandlerMessage} from "../../../hooks/useHandlerMessage";
import {useCreateDataHook} from "../../../hooks/useCreateDataHook";
import {DataGridInner} from "@UI/DataInner/DataInner";

const Node = () => {
  const theme = useTheme();
  const matches = useMediaQuery(MIN_WIDTH);
  const [open, setOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<INode[]>([]);
  const [titleForm, setTitleForm] = useState("");
  const [updateObj, setUpdateObj] = useState({});
  // const [title, setTitle] = useState("");
  const {data: selectNetworks} = networkAPI.useFetchNetworksSelectQuery();
  const [createDate] = useState<INodeCreate>({
    name: "",
    network: "",
    active: false,
    endpoint: ""
  });
  const {
    data: nodeData,
    isSuccess,
    isError,
    isLoading
  } = nodesAPI.useFetchAllNodesQuery({
    id: 1
  });
  const [
    updateNode,
    {data: nodeResponse}
  ] = nodesAPI.useUpdateNodeMutation();
  const [
    createNode,
    {data: createResponse}
  ] = nodesAPI.useCreateNodeMutation();

  useHandlerMessage(nodeResponse);

  // useErrorHandler(createDataError);

  useCreateDataHook(createResponse);

  useEffect(() => {
    if (nodeData) {
      setRows(nodeData.data);
    }
  }, [nodeData]);

  const initialState = useMemo(
    () => ({
      columns: {
        columnVisibilityModel: {
          id: matches,
          name: matches,
          endpoint: matches,
          active: matches,
        }
      }
    }),
    [matches]
  );
  const handleOpenDrawer = () => {
    setOpen(true);
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

  const {columns} = NodeMetaDataGrid({
    handleOpenDrawer,
    handleOpenModal,
    isSuccess
  } as unknown as NodeMetaDataGridProps);
  const createHandler = () => {
    setOpen(true);
    setUpdateObj(createDate);
    setTitleForm("Create");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: any) => {
    setOpen(false);
    if (titleForm === "Edit") {
      await updateNode(data);
    }
    if (titleForm === "Create") {
      await createNode(data);
    }
  };

  return (
    <>
      {isError && (
        <TransitionAlerts isOpen={isError} content={"Server not found"}/>
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
          Nodes
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
      <LayoutTable sx={{height: "80vh"}}>
        <DataGridInner
          initialState={initialState}
          columns={columns}
          rows={rows}
          isLoading={isLoading}
        />
        <ModalContainer open={open} handleClose={handleClose}>
          <UiForm
            selectData={selectNetworks}
            formMeta={NodeFormMeta}
            formData={updateObj}
            titleForm={titleForm}
            onSubmitForm={(data) => handleSubmit(data)}
            onOpen={setOpen}
          />
        </ModalContainer>
      </LayoutTable>
    </>
  );
};

export default Node;
