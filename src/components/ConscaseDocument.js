import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

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
      return () => {
         setConscase({});
      };
   }, []);

   return (
      <>
         {init ? (
            <>
               <br />
               <Container maxWidth="md">
                  <Typography component="h1" variant="h4">
                     {conscase.subject}
                  </Typography>
                  <hr />
                  <Box ml={2} overflow="auto">
                     <div dangerouslySetInnerHTML={{ __html: conscase.html }} />
                     <Button
                        onClick={goBack}
                        color="primary"
                        variant="outlined"
                     >
                        &nbsp;&nbsp;&nbsp;목록으로&nbsp;&nbsp;&nbsp;
                     </Button>{" "}
                     <br />
                     <br />
                     {location.pathname === "/admin/conscase/document" && (
                        <div>
                           <Button color="primary" variant="outlined">
                              &nbsp;&nbsp;&nbsp;수정&nbsp;&nbsp;&nbsp;
                           </Button>
                           &nbsp;&nbsp;&nbsp;
                           <Button
                              color="primary"
                              variant="outlined"
                              onClick={onDelete}
                           >
                              &nbsp;&nbsp;&nbsp;삭제&nbsp;&nbsp;&nbsp;
                           </Button>
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
