import ConscaseList from "components/ConscaseList";
import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import ConscaseEdit from "./ConscaseEdit";
import Navigation from "./Navigation";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
   content: {
      paddingLeft: "15%",
   },
});

function Conscases({ history }) {
   const [Editing, setEditing] = useState(false);
   const [conscases, setConscases] = useState([]);
   const styles = useStyles();

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
         <Navigation />
         <Container className={styles.content}>
            {Editing ? (
               <>
                  <ConscaseEdit onEditingClick={onEditingClick} />
               </>
            ) : (
               <>
                  <ConscaseList conscases={conscases} history={history} />
                  <button onClick={onEditingClick}>작성</button>
               </>
            )}
         </Container>
      </>
   );
}
export default Conscases;
