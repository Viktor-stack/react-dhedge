import { IFormMeta } from "../../../redux/interface/Setup/IFormMeta";
import { ITypeEnums } from "../../../redux/interface/Setup/ITypeEnums";

export const PoolFormMeta: IFormMeta = {
  btnTitle: "Save",
  fields: [
    {
      type: ITypeEnums.SELECT,
      fieldName: "network",
      ladle: "Network",
      disabled: true,
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
      fieldName: "address",
      ladle: "Address",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.BOOLEAN,
      fieldName: "automatic",
      ladle: "Automatic",
      validatorsProps: {}
    }
  ]
};
