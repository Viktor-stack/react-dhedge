export interface IVolumes {
  id: number;
  key: string;
  name: string;
  value: number;
}

export interface ISignalCandidate {
  key: string;
  limitCategoryId: number;
  marketCategoryId: number;
  poolId: number;
}
