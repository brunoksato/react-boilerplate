import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";
import { ThemeProvider } from "styled-components";
import store from "./configureStore";
import { GlobalStyle } from "./configureStyle";
import { theme } from "./theme";
import Routes from "./routes/index";
import history from "./utils/history";

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <GlobalStyle />
        <Routes history={history} />
      </StoreProvider>
    </ThemeProvider>
  </>,
  document.getElementById("root")
);

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept();
  }
}
