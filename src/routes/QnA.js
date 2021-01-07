import React, { useState } from "react";
import StorageService from "fbase";
import Question from "components/Question";

function QnA() {
  const [doseQuestion, setDoseQeustion] = useState(true);

  const onToggleQuestion = () => {
    setDoseQeustion((prev) => !prev);
  };

  return (
    <div>
      {doseQuestion ? (
        <Question onToggleQuestion={onToggleQuestion} />
      ) : (
        <div>
          <button onClick={onToggleQuestion}>질문하기 </button>
        </div>
      )}
    </div>
  );
}
export default QnA;
