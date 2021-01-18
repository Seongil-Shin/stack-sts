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
import ConscaseDocument from "components/ConscaseDocument";
import QuestionDocument from "components/Questions/QuestionDocument";
import Container from "@material-ui/core/Container";
import ConscaseEdit from "components/admin/ConscaseEdit";

function AdminIndex() {
   const [userId, setUserId] = useState("");

   const CustomRoute = (props) => {
      if (userId === process.env.REACT_APP_ADMIN_UID) {
         return <Route {...props} />;
      }
      return <Redirect from="*" to="/admin" />;
   };

   return (
      <>
         <br />
         <br />
         <Router>
            <Container maxWidth="lg">
               <Switch>
                  <Route exact path="/admin">
                     <Admin userId={userId} setUserId={setUserId} />
                  </Route>
                  <CustomRoute
                     exact
                     path="/admin/conscase/document"
                     component={ConscaseDocument}
                  />
                  <CustomRoute
                     exact
                     path="/admin/conscase/document/edit"
                     component={ConscaseEdit}
                  />
                  <CustomRoute
                     exact
                     path="/admin/conscase"
                     component={Conscases}
                  />
                  <CustomRoute
                     exact
                     path="/admin/questions"
                     component={Questions}
                  />
                  <CustomRoute
                     path="/admin/questions/document"
                     component={QuestionDocument}
                  />
               </Switch>
            </Container>
         </Router>
      </>
   );
}
export default AdminIndex;
