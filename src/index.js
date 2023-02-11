import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "./css/main.css";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import "react-quill/dist/quill.snow.css";

//폰트 전체적용을 위한 테마 설정
const theme = createTheme({
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
