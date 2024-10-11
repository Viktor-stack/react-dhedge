import {IPool} from "./IPool";
import {IToken} from "./IToken";

export interface IPair {
  id: number;
  tokenIn: IToken;
  tokenOut: IToken;
  tokenInAddress: string;
  tokenOutAddress: string;
  amountIn: number;
  amountOut: number;
  rate: string;
  operation: string;
  swapTxs: ITx[];
  status: SwapPairStatus;
  pool: IPool;
}

export interface ITx {
  id: number;
  chainId: number;
  blockNumber: number;
  confirmations: number;
  nonce: number;
  status: SwapPairStatus;
  hash: string;
  tokenIn: IToken;
  tokenOut: IToken;
  amountIn: string;
  amountOut: string;
  rate: string;
  gasPrice: number;
  gasLimit: number;
  pairId?: number;
  swapPair: IPair;
}

export const enum SwapPairStatus {
  START,
  STOP,
  FINISH
}
