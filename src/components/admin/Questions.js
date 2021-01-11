import QuestionList from "components/Questions/QuestionList";
import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";

function Questions({ history }) {
   const [questions, setQuestions] = useState([]);

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
         <QuestionList questions={questions} history={history} />
      </>
   );
}
export default Questions;
