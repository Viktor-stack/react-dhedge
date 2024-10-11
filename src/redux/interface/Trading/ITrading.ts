import { INetwork } from "../Setup/INetwork";

export interface ITrading {
  id: number;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
export interface ITradingPoolDetails {
  pool: {
    id: number;
    name: string;
    address: string;
    automatic: boolean;
    createdAt: string;
    updatedAt: string;
  };
  network: INetwork;
  tokens: [
    {
      id: number;
      name: string;
      symbol: string;
      address: string;
      decimals: number;
      amount: string;
      balance: string | number;
      rate: string | number;
      percentage: string | number;
      category: {
        id: number;
        name: string;
      };
    }
  ];
  signals: ISignal[];
  balance: number;
}

export interface ISignal {
  poolId: number;
  limitCategoryId: number;
  marketCategoryId: number;
  key: string;
}

export interface ITradingPoolDetailsData {
  approved?: boolean;
  data: {
    pools: ITradingPoolDetails[]
    managed: boolean
  }
  message: string;
}
