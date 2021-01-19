import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "./css/main.css";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
   typography: {
      fontFamily: "Jeju Gothic",
   },
});

ReactDOM.render(
   <MuiThemeProvider theme={theme}>
      <Typography component={"span"}>
         <App />
      </Typography>
   </MuiThemeProvider>,
   document.getElementById("root")
);
