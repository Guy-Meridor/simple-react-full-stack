import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./themes/ThemeContext";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
