import {IMarketCategory} from "./IMarketCategory";

export interface IOperation {
  id: number;
  key: string;
  name: string;
  marketCategories?: IMarketCategory[];
}
