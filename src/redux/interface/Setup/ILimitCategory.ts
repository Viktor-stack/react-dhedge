import {IExecutedTrade} from "./IExecutedTrade";
import {ILimitOrder} from "./ILimitOrder";
import {IMarketCategory} from "./IMarketCategory";

export interface ILimitCategory {
  id: number;
  firstMarketCategory: IMarketCategory;
  lastMarketCategory: IMarketCategory;
  enabled: boolean;
  executedTrades?: IExecutedTrade[];
  limitOrders?: ILimitOrder[];
}

export interface ILimitCategoryData {
  firstMarketCategories: IMarketCategory[];
  lastMarketCategories: IMarketCategory[];
  limitCategories: ILimitCategory[];
}