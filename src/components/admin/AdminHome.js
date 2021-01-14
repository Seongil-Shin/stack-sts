import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "components/admin/Navigation";

const useStyles = makeStyles({
   content: {
      minHeight: 400,
      paddingLeft: "15%",
   },
});

function AdminHome() {
   const styles = useStyles();
   return (
      <>
         <Navigation />
         <Container className={styles.content}>
            <div>어드민 홈입니다.</div>
         </Container>
      </>
   );
}
export default AdminHome;
