import React, {FC, Suspense} from "react";
import {useRoutes} from "react-router-dom";
import MainLayout from "./shared/layout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import PairDetails from "./pages/PairDetails/PairDetails";
import {
  Categories,
  Dapps,
  LimitCategories,
  MarketCategories,
  Networks,
  Nodes,
  Operations,
  Pools,
  PoolTokens,
  Settings,
  Tokens,
  Setup
} from "./router/lazyModule";
// import Setup from "./pages/Setup";
import Discovery from "./pages/Discovery/UI/Discovery";

const App: FC = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {path: "/", element: <Dashboard/>},
        {path:'discovery', element: <Discovery/>},
        {
          path: "setup",
          element: (
            <Suspense fallback={<span/>}>
              <Setup/>
            </Suspense>
          ),
          children: [
            {path: "networks", element: <Networks/>},
            {path: "nodes", element: <Nodes/>},
            {path: "dapps", element: <Dapps/>},
            {path: "categories", element: <Categories/>},
            {path: "operations", element: <Operations/>},
            {path: "pools", element: <Pools/>},
            {path: "tokens", element: <Tokens/>},
            {path: "pool-tokens", element: <PoolTokens/>},
            {path: "limit-categories", element: <LimitCategories/>},
            {path: "market-categories", element: <MarketCategories/>},
            {path: "settings", element: <Settings/>},
          ]
        },
        {
          path: "pair-details",
          element: <PairDetails/>
        },
        {path: "*", element: <NotFound/>}
      ]
    }
  ]);
};

export default App;
