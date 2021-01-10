import Conscases from "components/admin/Conscases";
import Questions from "components/admin/Questions";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Admin from "components/admin/Admin";

function AdminIndex() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route path="/admin/conscase" component={Conscases} />
          <Route path="/admin/questions" component={Questions} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}
export default AdminIndex;
