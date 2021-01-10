import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Greeting from "routes/Greeting";
import QnA from "routes/QnA";
import ConsCase from "routes/ConsCase";
import Navigation from "components/Navigation";
import QuestionDocument from "components/Questions/QuestionDocument";
import Admin from "routes/Admin";

function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Greeting" component={Greeting} />
        <Route exact path="/ConsCase" component={ConsCase} />
        <Route exact path="/QnA" component={QnA} />
        <Route exact path="/QnA/document" component={QuestionDocument} />
        <Route exact path="/admin" component={Admin} />
        <Route
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다:</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </Router>
  );
}
export default AppRouter;
