import { IToken } from "./IToken";
import { IMarketCategory } from "./IMarketCategory";

export interface ICategory {
  id: number;
  key: string;
  name: string;
  firstMarketCategories?: IMarketCategory[];
  lastMarketCategories?: IMarketCategory[];
  tokens?: IToken[];
}

export interface ICategoryCreate {
  key: string;
  name: string;
}
