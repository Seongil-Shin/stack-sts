import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import htmlToDraft from "html-to-draftjs";

function ConscaseDocument({ history }) {
   const location = useLocation();
   const conscaseId = location.state.conscaseId;
   const [init, setInit] = useState(false);
   const [conscase, setConscase] = useState({});
   const goBack = () => {
      history.goBack();
   };

   const getConscases = async () => {
      const dbconscases = await fireStoreService
         .collection("conscase")
         .doc(conscaseId)
         .get();
      setConscase((prev) => dbconscases.data());
      setInit(true);
   };

   const onDelete = async () => {
      const ok = window.confirm("정말로 삭제하시겠습니까?");
      if (ok) {
         await fireStoreService.doc(`conscase/${conscaseId}`).delete();
      }
      goBack();
   };

   useEffect(() => {
      getConscases();
   }, []);

   return (
      <>
         {init ? (
            <>
               <h3>{conscase.subject}</h3>
               <div dangerouslySetInnerHTML={{ __html: conscase.html }} />
               <button onClick={goBack}>목록으로</button>{" "}
               {location.pathname === "/admin/conscase/document" && (
                  <div>
                     <button>수정</button>
                     <button onClick={onDelete}>삭제</button>
                  </div>
               )}
            </>
         ) : (
            <>
               <div>initializing...</div>
            </>
         )}
      </>
   );
}
export default ConscaseDocument;
