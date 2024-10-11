import {lazy} from "react";

export const Setup = lazy(() => import("../pages/Setup"));
export const Categories = lazy(() => import("../pages/Setup/Categories/Category"));
export const Dapps = lazy(() => import("../pages/Setup/Dapps/Dapp"));
export const LimitCategories = lazy(() => import("../pages/Setup/LimitCategories/LimitCategory"));
export const MarketCategories = lazy(() => import("../pages/Setup/MarketCategories/MarketCategory"));
export const Networks = lazy(() => import("../pages/Setup/Networks/Network"));
export const Nodes = lazy(() => import("../pages/Setup/Nodes/Node"));
export const Operations = lazy(() => import("../pages/Setup/Operations/Operation"));
// export const Messages = lazy(() => import("../pages/Setup/Messages"));
export const PoolTokens = lazy(() => import("../pages/Setup/PoolTokens/PoolToken"));
export const Pools = lazy(() => import("../pages/Setup/Pools/Pool"));
export const Settings = lazy(() => import("../pages/Setup/Setting/Settings"));
export const StrategiesOperation = lazy(() => import("../pages/Setup/StrategiesOperation/StrategiesOperation"));
export const TokenOperations = lazy(
  () => import("../pages/Setup/TokenOperations/TokenOperations"));
export const Tokens = lazy(() => import("../pages/Setup/Tokens/Token"));
// export const Strategies = lazy(() => import("../pages/Setup/Operation/Operation"));
export const OperationsCategory = lazy(
  () => import("../pages/Setup/OperationsCategory/OperationsCategory")
);