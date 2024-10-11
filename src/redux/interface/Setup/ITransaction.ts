import {IExecutedTrade} from "./IExecutedTrade";

export interface ITransaction {
  id: number;
  executedTrade: IExecutedTrade;
  chainId: number;
  blockNumber: number;
  hash: string;
  nonce: number;
  confirmations: number;
  status: number;
  calcAmountIn: string;
  calcAmountOut: string;
  // calcRate: string;
  amountIn: string;
  amountOut: string;
  rateIn: string;
  rateOut: string;
  rateWrapped: string;
  slippage: string;
  gasPrice: number;
  gasLimit: number;
  createdAt?: Date;
  updatedAt?: Date;
}