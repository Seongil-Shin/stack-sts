import ConscaseDocument from "components/ConscaseDocument";
import ConscaseList from "components/ConscaseList";
import { Route } from "react-router-dom";

function ConsCase({ history }) {
   return (
      <>
         <Route exact path="/conscase">
            <ConscaseList history={history} />
         </Route>
         <Route path="/conscase/document">
            <ConscaseDocument history={history} />
         </Route>
      </>
   );
}
export default ConsCase;
