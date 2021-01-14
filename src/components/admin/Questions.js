import QuestionList from "components/Questions/QuestionList";
import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
   content: {
      paddingLeft: "15%",
   },
});

function Questions({ history }) {
   const [questions, setQuestions] = useState([]);
   const styles = useStyles();
   const getQuestions = async () => {
      const dbQuestions = await fireStoreService
         .collection("questions")
         .orderBy("createdAt", "desc")
         .get();
      const questionArray = [];
      dbQuestions.forEach((question) => {
         const quesObj = {
            ...question.data(),
            id: question.id,
         };
         questionArray.push(quesObj);
      });
      setQuestions((prev) => questionArray);
   };

   useEffect(() => {
      getQuestions();
   }, []);

   return (
      <>
         <Navigation />
         <Container className={styles.content}>
            <QuestionList questions={questions} history={history} />
         </Container>
      </>
   );
}
export default Questions;
