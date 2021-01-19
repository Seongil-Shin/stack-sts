import ConscaseList from "components/ConscaseList";
import React from "react";
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
   const styles = useStyles();

   const onEditingClick = () => {
      history.push("/admin/conscase/document/edit");
   };
   return (
      <>
         <Navigation />
         <Container className={styles.content}>
            <ConscaseList history={history} />
            <Button color="primary" variant="outlined" onClick={onEditingClick}>
               작성
            </Button>
         </Container>
      </>
   );
}
export default Conscases;
