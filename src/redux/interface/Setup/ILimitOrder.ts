import {ILimitCategory} from "./ILimitCategory";
import {IPool} from "./IPool";
import {IToken} from "./IToken";

export interface ILimitOrder {
  id: number;
  pool: IPool;
  limitCategory: ILimitCategory;
  tokenIn: IToken;
  tokenOut: IToken;
  calcAmountIn: string;
  calcAmountOut: string;
  amount: string;
  rateIn: string;
  rateOut: string;
  rateWrapped: string;
  slippage: string;
  // stopLoss: string;
  // stopLossPercent: string;
  // takeProfitPercent: string;
  createdAt: Date;
  updatedAt: Date;

}