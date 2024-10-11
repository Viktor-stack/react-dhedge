import {ITypeEnums} from "../../../../types/ITypeEnums";

interface ValidatorsProps {
  required?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface DirectionOfExchange {
  tokenFrom: {
    fields: Fields[]
  }
  tokenTo: {
    fields: Fields[]
  }
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
