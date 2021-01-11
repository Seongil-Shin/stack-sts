import ConscaseList from "components/ConscaseList";
import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import ConscaseEdit from "./ConscaseEdit";
import Navigation from "./Navigation";

function Conscases({ history }) {
   const [Editing, setEditing] = useState(false);
   const [conscases, setConscases] = useState([]);

   const onEditingClick = () => {
      setEditing((prev) => !prev);
   };

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
         {Editing ? (
            <>
               <ConscaseEdit onEditingClick={onEditingClick} />
            </>
         ) : (
            <>
               <Navigation />
               <ConscaseList conscases={conscases} history={history} />
               <button onClick={onEditingClick}>작성</button>
            </>
         )}
      </>
   );
}
export default Conscases;
