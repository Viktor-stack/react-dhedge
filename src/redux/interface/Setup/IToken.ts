import {ICategory} from "./ICategory";
import {INetwork} from "./INetwork";
import {IPoolToken} from "./IPoolToken";

export interface IToken {
  id: number;
  network: INetwork;
  category: ICategory;
  // liquidityToken: IToken;
  wrappedToken: IToken;
  // asset: IAsset; one-to-one\
  amount: string;
  balance: number;
  percentage: string;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  imageUrl: string;
  maxTxAmountBuy: number;
  maxTxAmountSell: number;
  maxTxRelation: number;
  multiFactor: number;
  enabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  poolTokens?: IPoolToken[];
  liquidityTokens?: IToken[];
  wrappedTokens?: IToken[];
  executeTradeTokensIn?: IToken[];
  executeTradeTokensOut?: IToken[];
  orderTokensIn?: IToken[];
  orderTokensOut?: IToken[];
}

export interface ITokenCreate {
  network?: string | number;
  category?: string | number;
  // liquidityToken?: string | number;
  wrappedToken?: string | number;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  imageUrl: string;
  maxTxAmountBuy: number;
  maxTxAmountSell: number;
  maxTxRelation: number;
  multiFactor: number;
  enabled: boolean;
}
