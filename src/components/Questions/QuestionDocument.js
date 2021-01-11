import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import CheckPassword from "components/CheckPassword";
import { fireStoreService } from "fbase";

function QuestionDocument({ history }) {
   const location = useLocation();
   const question = location.state.question;
   const [isPassword, setIsPassword] = useState(
      question.password !== "" &&
         history.location.pathname !== "/admin/questions/document"
   );
   const [newComment, setNewComment] = useState("");
   const [comments, setComments] = useState(question.comment);
   const nextCommentId = useRef(Object.keys(comments).length);

   useEffect(() => {
      setComments(question.comment);
   }, [question.comment]);

   const onToggleIsPassword = () => {
      setIsPassword((prev) => !prev);
   };
   const goBack = () => {
      history.goBack();
   };
   const onDelete = async () => {
      const ok = window.confirm("정말로 삭제하시겠습니까?");
      if (ok) {
         await fireStoreService.doc(`questions/${question.id}`).delete();
         goBack();
      }
   };

   const onSubmit = async (event) => {
      event.preventDefault();
      let newCommentObj = {};
      if (newComment !== "") {
         newCommentObj = {
            comment: newComment,
            createdAt: Date.now(),
            isAdmin: false,
         };
         setComments((prev) => ({
            ...comments,
            [nextCommentId.current]: newCommentObj,
         }));
      }
      const questionObj = {
         ...question,
         comment: { ...comments, [nextCommentId.current]: newCommentObj },
         answered:
            history.location.pathname === "/admin/questions/document"
               ? true
               : false,
      };
      await fireStoreService
         .collection("questions")
         .doc(question.id)
         .set(questionObj);
      setNewComment((prev) => "");
      nextCommentId.current += 1;
   };
   const onChange = (event) => {
      const {
         target: { name, value },
      } = event;
      if (name === "newComment") {
         setNewComment((prev) => value);
      }
   };
   return (
      <>
         {isPassword ? (
            <CheckPassword
               password={question.password}
               onToggleIsPassword={onToggleIsPassword}
               history={history}
            />
         ) : (
            <>
               <div>
                  <h4>{question.subject}</h4>
                  <div>
                     {Object.values(question.files).map((file, index) => (
                        <div key={index}>
                           <a
                              href={file.URL}
                              download={file.name}
                              target="_blank"
                              rel="noreferrer"
                           >
                              {file.name}
                           </a>
                        </div>
                     ))}
                  </div>
                  <div>{question.text}</div>
                  {(question.password !== "" ||
                     history.location.pathname ===
                        "/admin/questions/document") && (
                     <div>
                        <button onClick={onDelete}>삭제</button>
                        <button>수정</button>
                     </div>
                  )}{" "}
                  <div>
                     <form onSubmit={onSubmit}>
                        <span>댓글</span>
                        <br></br>
                        <input
                           name="newComment"
                           value={newComment}
                           onChange={onChange}
                           maxLength={1000}
                           style={{ width: 500, height: 80 }}
                        ></input>
                        <br />
                        <input type="submit" value="등록" />
                     </form>
                  </div>
                  {Object.values(comments).map((comment, index) => (
                     <div key={index}>
                        <span>{comment.comment}</span>
                        <span>{comment.createdAt}</span>
                     </div>
                  ))}
               </div>
               <button onClick={goBack}>뒤로가기</button>
            </>
         )}
      </>
   );
}
export default QuestionDocument;
