import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Greeting from "routes/Greeting";
import QnA from "routes/QnA";
import ConsCase from "routes/ConsCase";
import QuestionDocument from "components/Questions/QuestionDocument";
import AdminIndex from "routes/AdminIndex";
import Header from "./Header";

function AppRouter() {
   return (
      <Router>
         <Header title="Blog" />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/greeting" component={Greeting} />
            <Route path="/conscase" component={ConsCase} />
            <Route exact path="/qna" component={QnA} />
            <Route exact path="/qna/document" component={QuestionDocument} />
            <Route path="/admin" component={AdminIndex} />

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