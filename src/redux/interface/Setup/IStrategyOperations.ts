interface Strategies {
  id: number;
  alias: string;
  event: string;
  name: string;
}
export interface Operations {
  id: number;
  action: string;
  alias: string;
  factor: number;
  name: string;
  type: string;
}
export interface IStrategyOperations {
  id: number;
  enabled: boolean;
  operation: { id: number };
  strategy: { id: number };
}

export interface IPoolStrategies {
  readonly operations: Operations[];
  readonly strategies: Strategies[];
  readonly strategyOperations: IStrategyOperations[];
}
