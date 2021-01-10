import Conscases from "components/admin/Conscases";
import Questions from "components/admin/Questions";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Admin from "components/admin/Admin";
import { useState } from "react";

function AdminIndex() {
  const [userId, setUserId] = useState("");

  const CustomRoute = (props) => {
    if (userId === process.env.REACT_APP_ADMIN_UID) {
      return <Route {...props} />;
    }
    return <Redirect from="*" to="/admin" />;
  };
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/admin">
            <Admin userId={userId} setUserId={setUserId} />
          </Route>
          <CustomRoute path="/admin/conscase" component={Conscases} />
          <CustomRoute path="/admin/questions" component={Questions} />
        </Switch>
      </Router>
    </div>
  );
}
export default AdminIndex;
