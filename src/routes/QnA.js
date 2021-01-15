import React, { useEffect, useState } from "react";
import { fireStoreService } from "fbase";
import WritingQuestion from "components/Questions/WritingQuestion";
import QuestionList from "components/Questions/QuestionList";
import { useHistory, useLocation } from "react-router";

function QnA() {
   const [doseQuestion, setDoseQeustion] = useState(true);
   const [questions, setQuestions] = useState([]);
   const history = useHistory();
   const location = useLocation();
   const [editQuestionObj, setEditQuestionObj] = useState(
      location.state ? location.state.question : null
   );

   const onToggleQuestion = () => {
      if (doseQuestion === true) {
         setDoseQeustion((prev) => !prev);
         getQuestions();
      } else {
         setDoseQeustion((prev) => !prev);
         setQuestions((prev) => []);
      }
   };

   useEffect(() => {}, []);

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

   return (
      <div>
         {doseQuestion ? (
            <WritingQuestion onToggleQuestion={onToggleQuestion} />
         ) : (
            <QuestionList
               onToggleQuestion={onToggleQuestion}
               questions={questions}
               history={history}
            />
         )}
      </div>
   );
}
export default QnA;
