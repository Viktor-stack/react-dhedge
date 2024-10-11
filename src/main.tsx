import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { StyledEngineProvider } from "@mui/material";
import ErrorBoundary from "./shared/ErrorBoundary/ErrorBoundary";
import { SSEProvider } from "react-hooks-sse";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <StyledEngineProvider injectFirst={true}>
        <SnackbarProvider maxSnack={3}>
          <SSEProvider endpoint="/api/swap/sse">
            <ErrorBoundary>
              <DevSupport ComponentPreviews={ComponentPreviews}
                          useInitialHook={useInitial}
              >
                <App />
              </DevSupport>
            </ErrorBoundary>
          </SSEProvider>
        </SnackbarProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </Provider>
);
