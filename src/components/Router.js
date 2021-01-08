import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "routes/Home";
import Greeting from "routes/Greeting";
import QnA from "routes/QnA";
import ConsCase from "routes/ConsCase";
import Navigation from "components/Navigation";

function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Greeting" component={Greeting} />
        <Route exact path="/ConsCase" component={ConsCase} />
        <Route exact path="/QnA" component={QnA} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
export default AppRouter;
