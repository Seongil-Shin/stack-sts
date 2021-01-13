import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";

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
         goBack();
      }
   };

   useEffect(() => {
      getConscases();
   }, []);

   return (
      <>
         {init ? (
            <>
               <br />
               <Container maxWidth="lg">
                  <Typography component="h1" variant="h4">
                     <h3>{conscase.subject}</h3>
                  </Typography>
                  <hr />
                  <Box ml={2} overflow="auto">
                     <div dangerouslySetInnerHTML={{ __html: conscase.html }} />
                     <Fab onClick={goBack} color="primary" variant="extended">
                        &nbsp;&nbsp;&nbsp;목록으로&nbsp;&nbsp;&nbsp;
                     </Fab>{" "}
                     <br />
                     <br />
                     {location.pathname === "/admin/conscase/document" && (
                        <div>
                           <Fab color="primary" variant="extended">
                              &nbsp;&nbsp;&nbsp;수정&nbsp;&nbsp;&nbsp;
                           </Fab>
                           &nbsp;&nbsp;&nbsp;
                           <Fab
                              color="primary"
                              variant="extended"
                              onClick={onDelete}
                           >
                              &nbsp;&nbsp;&nbsp;삭제&nbsp;&nbsp;&nbsp;
                           </Fab>
                        </div>
                     )}
                  </Box>
               </Container>
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
