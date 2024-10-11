import { ICategory } from "./ICategory";
import { IDapp } from "./IDapp";
// import { ILimitCategory } from "./ILimitCategory";
import { IOperation } from "./IOperation";

export interface IMarketCategory {
  id: number;
  key: string;
  name: string;
  dapp: IDapp;
  firstCategory: ICategory;
  lastCategory: ICategory;
  operation: IOperation;
  enabled: boolean;
  // firstLimitCategories?: ILimitCategory[];
  // lastLimitCategories?: ILimitCategory[];
  // executedTrades?: ExecutedTradeEntity[];
}

export interface IMarketCategoryData {
  readonly firstCategories: ICategory[];
  readonly lastCategories: ICategory[];
  readonly marketCategories: IMarketCategory[];
}
