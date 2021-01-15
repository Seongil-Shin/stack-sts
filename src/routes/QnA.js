import React from "react";
import WritingQuestion from "components/Questions/WritingQuestion";
import QuestionList from "components/Questions/QuestionList";
import { useHistory } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import QuestionDocument from "components/Questions/QuestionDocument";

function QnA() {
   const history = useHistory();

   return (
      <div>
         <Switch>
            <Route exact path="/qna">
               <WritingQuestion history={history} />
            </Route>
            <Route exact path="/qna/list">
               <QuestionList history={history} />
            </Route>
            <Route exact path="/qna/list/document">
               <QuestionDocument history={history} />
            </Route>
            <Route exact path="/qna/list/document/edit">
               <WritingQuestion history={history} />
            </Route>
            <Redirect from="*" to="/qna" />
         </Switch>
      </div>
   );
}
export default QnA;
