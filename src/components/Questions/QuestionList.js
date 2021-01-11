import React, { useState } from "react";

function QuestionList({ onToggleQuestion, questions, history }) {
   const pages = questions.length / 10 + (questions.length % 10 > 0 ? 1 : 0);
   const [currentPage, setCurrentPage] = useState(0);
   const onPageChange = (e) => {
      const {
         target: { id },
      } = e;
      setCurrentPage((prev) => id - 1);
   };

   const onDocumentClick = (question) => {
      history.push({
         pathname: history.location.pathname + "/document",
         state: { question: question },
      });
   };

   const renderPages = () => {
      const pageButtons = [];
      for (let i = 1; i < pages; i++) {
         pageButtons.push(
            <button key={i} id={i} onClick={onPageChange}>
               {i}&nbsp;
            </button>
         );
      }
      return pageButtons;
   };
   return (
      <>
         <div>
            <h3>문의 내역</h3>
            {history.location.pathname === "/qna" && (
               <button onClick={onToggleQuestion}>질문하기 </button>
            )}
            <table>
               <thead>
                  <tr>
                     <th>제목</th>
                     <th></th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {questions
                     .slice(currentPage * 10, (currentPage + 1) * 10)
                     .map((question, index) => (
                        <tr
                           key={index}
                           onClick={() => onDocumentClick(question)}
                        >
                           <td>{question.subject}</td>
                           <td>{question.answered ? "완료" : null}</td>
                           {question.password !== "" && <td>비밀번호</td>}
                        </tr>
                     ))}
               </tbody>
            </table>
            <footer>{renderPages()}</footer>
         </div>
      </>
   );
}
export default QuestionList;
