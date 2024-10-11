import {IMarketCategory} from "./IMarketCategory";

export interface IDapp {
  id: number;
  key: string;
  name: string;
  minSlippage: number;
  maxSlippage: number;
  stepSlippage: number;
  marketCategories?: IMarketCategory[];
}

export interface IDappCreate {
  key: string;
  name: string;
  minSlippage: number;
  maxSlippage: number;
  stepSlippage: number;
}