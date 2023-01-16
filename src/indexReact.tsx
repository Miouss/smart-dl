import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./React/App";
import customTheme from "./React//styles/theme";

import { ThemeProvider } from "@mui/material";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={customTheme}>
    <App />
  </ThemeProvider>
);
