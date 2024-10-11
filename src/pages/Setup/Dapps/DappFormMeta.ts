import { IFormMeta } from "../../../redux/interface/Setup/IFormMeta";
import { ITypeEnums } from "../../../redux/interface/Setup/ITypeEnums";

export const DappFormMeta: IFormMeta = {
  btnTitle: "Save",
  fields: [
    {
      type: ITypeEnums.TEXT,
      fieldName: "key",
      ladle: "Key",
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
      fieldName: "minSlippage",
      ladle: "Min slippage",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "maxSlippage",
      ladle: "Max slippage",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "stepSlippage",
      ladle: "Step slippage",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
  ]
};
