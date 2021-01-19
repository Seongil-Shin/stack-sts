import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Greeting from "routes/Greeting";
import QnA from "routes/QnA";
import ConsCase from "routes/ConsCase";
import AdminIndex from "routes/AdminIndex";
import Header from "./Header";
import { Typography } from "@material-ui/core";

function AppRouter() {
   return (
      <Router>
         <Header />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/greeting" component={Greeting} />
            <Route path="/conscase" component={ConsCase} />
            <Route path="/qna" component={QnA} />
            <Route path="/admin" component={AdminIndex} />

            <Route
               render={() => (
                  <Typography
                     align="center"
                     style={{ paddingTop: "10%", paddingBottom: "10%" }}
                  >
                     이 페이지는 존재하지 않습니다.
                     <br />
                     <br />위 메뉴를 통해 이동해 주세요.
                  </Typography>
               )}
            />
         </Switch>
      </Router>
   );
}
export default AppRouter;
