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
   <React.StrictMode>
      <MuiThemeProvider theme={theme}>
         <Typography>
            <App />
         </Typography>
      </MuiThemeProvider>
   </React.StrictMode>,
   document.getElementById("root")
);
