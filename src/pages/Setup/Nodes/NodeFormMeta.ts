import { IFormMeta } from "../../../redux/interface/Setup/IFormMeta";
import { ITypeEnums } from "../../../redux/interface/Setup/ITypeEnums";

export const NodeFormMeta: IFormMeta = {
  btnTitle: "Save",
  fields: [
    {
      type: ITypeEnums.SELECT,
      fieldName: "network",
      ladle: "Network",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "name",
      ladle: "Name",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "endpoint",
      ladle: "Endpoint",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.BOOLEAN,
      fieldName: "active",
      ladle: "Active",
      validatorsProps: {}
    },
  ]
};
