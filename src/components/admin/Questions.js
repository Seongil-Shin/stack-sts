import QuestionList from "components/Questions/QuestionList";
import React from "react";
import Navigation from "./Navigation";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
   content: {
      paddingLeft: "15%",
   },
});

function Questions({ history }) {
   const styles = useStyles();

   return (
      <>
         <Navigation />
         <Container className={styles.content}>
            <QuestionList history={history} />
         </Container>
      </>
   );
}
export default Questions;
