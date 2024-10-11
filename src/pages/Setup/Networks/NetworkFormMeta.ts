import { IFormMeta } from "../../../redux/interface/Setup/IFormMeta";
import { ITypeEnums } from "../../../redux/interface/Setup/ITypeEnums";

export const NetworkFormMeta: IFormMeta = {
  btnTitle: "Save",
  fields: [
    {
      type: ITypeEnums.TEXT,
      fieldName: "name",
      ladle: "Name",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.NUMBER,
      fieldName: "chainId",
      ladle: "Chain Id",
      validatorsProps: {
        required: "The field cannot be empty",
        min: 1,
        minLength: 1,
        maxLength: 12
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "currency",
      ladle: "Currency",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.BOOLEAN,
      fieldName: "active",
      ladle: "Active",
      disabled: false,
      validatorsProps: {}
    }
  ]
};
