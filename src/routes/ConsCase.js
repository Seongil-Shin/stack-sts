import ConscaseDocument from "components/ConscaseDocument";
import ConscaseList from "components/ConscaseList";
import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

function ConsCase({ history }) {
   const [conscases, setConscases] = useState([]);
   const getConscases = async () => {
      const dbconscases = await fireStoreService
         .collection("conscase")
         .orderBy("createdAt", "desc")
         .get();
      const conscaseArray = [];
      dbconscases.forEach((conscase) => {
         const consData = { ...conscase.data() };
         const consObj = {
            subject: consData.subject,
            thumbnail: consData.thumbnail,
            id: conscase.id,
         };
         conscaseArray.push(consObj);
      });
      setConscases((prev) => conscaseArray);
   };

   useEffect(() => {
      getConscases();
   }, []);

   return (
      <>
         <Route exact path="/conscase">
            <ConscaseList conscases={conscases} history={history} />
         </Route>
         <Route path="/conscase/document">
            <ConscaseDocument history={history} />
         </Route>
      </>
   );
}
export default ConsCase;
