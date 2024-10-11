import { INetwork } from "./INetwork";

export interface IPool {
  id: number;
  network: INetwork | number;
  name: string;
  address: string;
  automatic: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPoolCreate {
  name: string;
  address: string;
  automatic?: boolean;
  network: INetwork | number;
}
