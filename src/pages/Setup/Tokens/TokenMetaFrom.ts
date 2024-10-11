import { IFormMeta } from "../../../redux/interface/Setup/IFormMeta";
import { ITypeEnums } from "../../../redux/interface/Setup/ITypeEnums";

export const TokenMetaFrom: IFormMeta = {
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
      type: ITypeEnums.SELECT,
      fieldName: "category",
      ladle: "Category",
      validatorsProps: {
        required: "The field cannot be selected"
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
      fieldName: "symbol",
      ladle: "Symbol",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.SELECT,
      fieldName: "wrappedToken",
      ladle: "Wrapped token",
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
      type: ITypeEnums.NUMBER,
      fieldName: "decimals",
      ladle: "Decimals",
      validatorsProps: {
        required: "The field cannot be empty",
        min: 1
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "imageUrl",
      ladle: "Image URL",
      validatorsProps: {
        // required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.NUMBER,
      fieldName: "maxTxAmountBuy",
      ladle: "Max amount buy",
      validatorsProps: {
        required: "The field cannot be empty",
        min: 0.2
      }
    },
    {
      type: ITypeEnums.NUMBER,
      fieldName: "maxTxAmountSell",
      ladle: "Max amount sell",
      validatorsProps: {
        required: "The field cannot be empty",
        min: 0.2
      }
    },
    {
      type: ITypeEnums.NUMBER,
      fieldName: "multiFactor",
      ladle: "Multi factor",
      validatorsProps: {
        required: "The field cannot be empty",
        min: 1
      }
    },
    {
      type: ITypeEnums.BOOLEAN,
      fieldName: "enabled",
      ladle: "Enabled",
      validatorsProps: {}
    }
    // {
    //   type: ITypeEnums.RADIO,
    //   ladle: "Dapps",
    //   fieldName: "dapp",
    //   validatorsProps: {
    //     required: "The field cannot be empty"
    //   }
    // }
  ]
};
