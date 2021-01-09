import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router";
import CheckPassword from "components/CheckPassword";
import { fireStoreService } from "fbase";

function QuestionDocument() {
  const location = useLocation();
  const question = location.state.question;
  const history = useHistory();
  const [isPassword, setIsPassword] = useState(question.password !== "");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(question.comment);
  const nextCommentId = useRef(Object.keys(comments).length);

  useEffect(() => {
    setComments(question.comment);
  }, [question.comment]);

  const onToggleIsPassword = () => {
    setIsPassword((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newCommentObj = {
      comment: newComment,
      createdAt: Date.now(),
      isAdmin: false,
    };
    setComments((prev) => ({
      ...comments,
      [nextCommentId.current]: newCommentObj,
    }));
    const questionObj = {
      ...question,
      comment: { ...comments, [nextCommentId.current]: newCommentObj },
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
        <div>
          <h4>{question.subject}</h4>
          <div>
            {Object.values(question.files).map((file, index) => (
              <a
                href={file.URL}
                download={file.name}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                {file.name}
              </a>
            ))}
          </div>
          <div>{question.text}</div>
          <div>
            <button>삭제</button>
            <button>수정</button>
          </div>
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
      )}
    </>
  );
}
export default QuestionDocument;
