import React, { useState } from "react";
import { fireStoreService } from "fbase";
import Question from "components/Question";
import QuestionList from "components/QuestionList";

function QnA() {
  const [doseQuestion, setDoseQeustion] = useState(true);
  const [questions, setQuestions] = useState([]);

  const onToggleQuestion = () => {
    if (doseQuestion === true) {
      setDoseQeustion((prev) => !prev);
      getQuestions();
    } else {
      setDoseQeustion((prev) => !prev);
      setQuestions((prev) => []);
    }
  };

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
        <Question onToggleQuestion={onToggleQuestion} />
      ) : (
        <QuestionList
          onToggleQuestion={onToggleQuestion}
          questions={questions}
        />
      )}
    </div>
  );
}
export default QnA;
