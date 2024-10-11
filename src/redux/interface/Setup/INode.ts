import { INetwork } from "./INetwork";

export interface INode {
  id: number;
  name: string;
  endpoint: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  network: INetwork | string | number;
}
export interface INodeCreate {
  name: string;
  endpoint: string;
  active: boolean;
  network: INetwork | string | number;
}
