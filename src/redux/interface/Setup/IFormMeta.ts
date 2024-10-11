import { ITypeEnums } from "./ITypeEnums";
interface ValidatorsProps {
  required?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
export interface Fields {
  type: ITypeEnums;
  fieldName: string;
  ladle: string;
  disabled?: boolean;
  validatorsProps: ValidatorsProps;
}

export interface IFormMeta {
  // titleForm: string
  btnTitle: string;
  fields: Fields[];
}
