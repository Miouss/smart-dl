import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./React/App";


import { ThemeProvider } from "@mui/material";

import "./index.css";
import customTheme from "./React/styles/theme";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
 <ThemeProvider theme={customTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider> 
);
