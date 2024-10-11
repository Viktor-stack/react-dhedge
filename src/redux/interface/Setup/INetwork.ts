import { IPool } from "./IPool";
import { IToken } from "./IToken";

export interface INetwork {
  id: number;
  chainId: number;
  currency: string;
  key: string;
  name: string;
  active: boolean;
  pools?: IPool[];
  tokens?: IToken[];
}

export interface INetworkCreate {
  chainId: number;
  currency: string;
  key: string;
  name: string;
  active: boolean;
}
