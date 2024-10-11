import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { networkAPI } from "@RTK/Setup/network.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { poolTokenAPI } from "@RTK/Setup/poolToken.service";
import { strategiesOperationAPI } from "@RTK/Setup/strategiesOperation.service";
import { poolAPI } from "@RTK/Setup/pool.service";
import { tokenAPI } from "@RTK/Setup/token.service";
import { tokenOperationsAPI } from "@RTK/Setup/tokenOperations.service";
import { operationAPI } from "@RTK/Setup/operation.service";
import { categoryAPI } from "@RTK/Setup/category.service";
import { tradingAPI } from "@RTK/Trading/trading.service";
import { nodesAPI } from "@RTK/Setup/node.service";
import { eventAPI } from "@RTK/Setup/signals.service";
import { limitCategoryAPI } from "@RTK/Setup/limitCategory.service";
import { marketCategoryAPI } from "@RTK/Setup/marketCategory.service";
import {operationCategoryAPI} from "@RTK/Setup/operationCategory.service";
import { pairDetailsAPI } from "@RTK/PairDetails/pair-details.service";
import { settingAPI } from "@RTK/Setup/setting.service";
import {discoveryAPI} from "@RTK/Discovery/discovery.service";
import {dappAPI} from "@RTK/Setup/dapp.service";

const rootReducer = combineReducers({
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [dappAPI.reducerPath]: dappAPI.reducer,
  [discoveryAPI.reducerPath]: discoveryAPI.reducer,
  [eventAPI.reducerPath]: eventAPI.reducer,
  [limitCategoryAPI.reducerPath]: limitCategoryAPI.reducer,
  [marketCategoryAPI.reducerPath]: marketCategoryAPI.reducer,
  [networkAPI.reducerPath]: networkAPI.reducer,
  [nodesAPI.reducerPath]: nodesAPI.reducer,
  [operationCategoryAPI.reducerPath]: operationCategoryAPI.reducer,
  [operationAPI.reducerPath]: operationAPI.reducer,
  [pairDetailsAPI.reducerPath]: pairDetailsAPI.reducer,
  [poolAPI.reducerPath]: poolAPI.reducer,
  [poolTokenAPI.reducerPath]: poolTokenAPI.reducer,
  [settingAPI.reducerPath]: settingAPI.reducer,
  [strategiesOperationAPI.reducerPath]: strategiesOperationAPI.reducer,
  [tokenAPI.reducerPath]: tokenAPI.reducer,
  [tokenOperationsAPI.reducerPath]: tokenOperationsAPI.reducer,
  [tradingAPI.reducerPath]: tradingAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      categoryAPI.middleware,
      dappAPI.middleware,
      discoveryAPI.middleware,
      eventAPI.middleware,
      limitCategoryAPI.middleware,
      marketCategoryAPI.middleware,
      networkAPI.middleware,
      nodesAPI.middleware,
      operationCategoryAPI.middleware,
      operationAPI.middleware,
      pairDetailsAPI.middleware,
      poolAPI.middleware,
      poolTokenAPI.middleware,
      settingAPI.middleware,
      strategiesOperationAPI.middleware,
      tokenAPI.middleware,
      tokenOperationsAPI.middleware,
      tradingAPI.middleware,
    )
});

setupListeners(store.dispatch);
