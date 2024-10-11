import { Token } from "./IPoolToken";
import { Operations } from "./IStrategyOperations";
interface TokenOperations {
  id: number;
  enabled: boolean;
  token: {
    id: number;
  };
  operation: {
    id: number;
  };
}
export interface ITokenOperations {
  tokens: Token[];
  operations: Operations[];
  tokenOperations: TokenOperations[];
}
