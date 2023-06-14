import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./renderer/App";

import { ThemeProvider } from "@mui/material/styles";

import customTheme from "./renderer/styles/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={customTheme}>
    <App />
  </ThemeProvider>
);
