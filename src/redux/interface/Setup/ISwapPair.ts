import { ITx, SwapPairStatus } from "./IPair";
import { IToken } from "./IToken";

export interface ISwapPair {
  id: number;
  tokenIn: IToken;
  tokenOut: IToken;
  tokenInAddress: string;
  tokenOutAddress: string;
  tokenInAmount: string;
  tokenOutAmount: string;
  operation: string;
  status: SwapPairStatus;
  createdAt: string;
  updatedAt: string;
  swapTxs: ITx[];
}
