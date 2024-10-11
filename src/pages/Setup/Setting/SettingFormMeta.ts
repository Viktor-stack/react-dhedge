import { IFormMeta } from "../../../redux/interface/Setup/IFormMeta";
import { ITypeEnums } from "../../../redux/interface/Setup/ITypeEnums";

export const SettingFormMeta: IFormMeta = {
  btnTitle: "Save",
  fields: [
    {
      type: ITypeEnums.TEXT,
      fieldName: "name",
      ladle: "Name",
      disabled: true,
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "key",
      ladle: "Key",
      disabled: true,
      validatorsProps: {
        required: "The field cannot be empty",
        min: 1,
        minLength: 1,
        maxLength: 12
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "description",
      ladle: "Description",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "type",
      ladle: "Type",
      disabled: true,
      validatorsProps: {
        required: "The field cannot be empty"
      }
    },
    {
      type: ITypeEnums.TEXT,
      fieldName: "value",
      ladle: "Value",
      validatorsProps: {
        required: "The field cannot be empty"
      }
    }
  ]
};