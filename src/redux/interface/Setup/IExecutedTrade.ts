import {ILimitCategory} from "./ILimitCategory";
import {IMarketCategory} from "./IMarketCategory";
import {IPool} from "./IPool";
import {IToken} from "./IToken";

export interface IExecutedTrade {
  id: number;
  pool: IPool;
  limitCategory?: ILimitCategory;
  marketCategory?: IMarketCategory;
  tokenIn: IToken;
  tokenOut: IToken;
  balanceInBefore: string;
  balanceInAfter: string;
  exactPercentAmountIn: string;
  exactAmountIn: string;
  calcAmountIn: string;
  calcAmountOut: string;
  amountIn: string;
  amountOut: string;
  rateIn: string;
  rateOut: string;
  rateWrapped: string;
  slippage: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}