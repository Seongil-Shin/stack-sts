import { fireStoreService } from "fbase";
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";

function Questions() {
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
      <div>질문입니다.</div>
    </>
  );
}
export default Questions;
