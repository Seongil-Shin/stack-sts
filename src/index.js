import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "./css/main.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
   typography: {
      fontFamily: "Jeju Gothic",
   },
});

ReactDOM.render(
   <React.StrictMode>
      <MuiThemeProvider theme={theme}>
         <App />
      </MuiThemeProvider>
   </React.StrictMode>,
   document.getElementById("root")
);
