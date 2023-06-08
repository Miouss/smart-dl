import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./client/App";


import { ThemeProvider } from "@mui/material";

import "./index.css";
import customTheme from "./client/styles/theme";


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
