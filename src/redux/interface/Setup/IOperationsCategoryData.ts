import { IStrategies } from "./IStrategies";
import { IVolumes } from "./IVolumes";

export interface IOperationVolumes {
  id: number;
  composite: boolean;
  category: {
    bindEnabled:boolean,
    "id": number,
    "key": string,
    "name": string,
  };
  operation: {
    id: number;
    name: string;
  };
}

export interface IOperationsCategoryData {
  categories: IVolumes[];
  operationCategories: IOperationVolumes[];
  operations: IStrategies[];
}
