export interface IMarketForm {
  pool: {
    poolId: number
    balance: number,
    // poolBalanceStable: "",
  },
  spotTokens: ISpotTokens[]
  marketCategory: {
    id: number
    firstCategoryId: number,
    lastCategoryId: number,
    dapp: {
      key: string,
      name: string,
      minSlippage: number
      maxSlippage: number
      stepSlippage: number,
    },
    operation: {
      key: string
    }
  },
  tokenFrom: {
    selectTokens: ITokensFrom[],
    selected: ISelectToken,
    payWithAmount: string,
    wrappedPrice: string,
  },
  tokenTo: {
    selectTokens: ITokenTo[],
    selected: ISelectToken,
    estimatedAmount: string
  },
  txAmount: string,
  txCommission: string,
  txCount: string,
  amountCommission: string,
  key: string,
  options: {
    gasLimit: string,
    maxPriorityFeePerGas: string,
    maxFeePerGas: string
  },
}

interface ITokensFrom {
  id: number;
  name: string;
  symbol: string;
  maxTxAmountBuy: number;
  maxTxAmountSell: number;
  maxTxRelation: number;
}

interface ITokenTo {
  id: number;
  name: string;
  symbol: string;
  maxTxAmountBuy: number;
  maxTxAmountSell: number;
  maxTxRelation: number;
}

interface ISelectToken {
  id: number;
  // category: CategoryEntity;
  // wrappedToken: TokenEntity;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  maxTxAmount: number;
  maxTxRelation: number;
  amount?: string;
  rate?: string;
  balance?: number;
}

export interface ISpotTokens {
  rate: string;
  symbol: string;
}