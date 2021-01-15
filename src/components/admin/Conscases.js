import ConscaseList from "components/ConscaseList";
import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
   content: {
      paddingLeft: "15%",
   },
});

function Conscases({ history }) {
   const [conscases, setConscases] = useState([]);
   const styles = useStyles();

   const onEditingClick = () => {
      history.push("/admin/conscase/edit");
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
         <Navigation />
         <Container className={styles.content}>
            <ConscaseList conscases={conscases} history={history} />
            <Button color="primary" variant="outlined" onClick={onEditingClick}>
               작성
            </Button>
         </Container>
      </>
   );
}
export default Conscases;
