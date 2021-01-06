import React, { useState } from "react";
import StorageService from "fbase";

function QnA() {
  const [question, setQeustion] = useState(true);
  const [subject, setSubject] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [password, setPassword] = useState("");

  const onChange = (event) => {};
  const onToggleIsPassword = () => {
    setIsPassword((prev) => !prev);
  };
  const onToggleQuestion = () => {
    setQeustion((prev) => !prev);
  };
  const onSubmit = () => {
    setQeustion((prev) => !prev);
  };

  return (
    <div>
      {question ? (
        <>
          <form onSubmit={onSubmit}>
            <label>
              {" "}
              제목 :{" "}
              <input
                value={subject}
                onChange={onChange}
                type="text"
                placeholder=""
                maxLength={120}
              ></input>
            </label>
            <br />
            <label>
              비밀번호 :{" "}
              <input
                type="checkBox"
                onChange={onToggleIsPassword}
                checked={isPassword}
              />
            </label>
            <br />
            {isPassword && (
              <label>
                비밀번호 입력 :{" "}
                <input
                  type="password"
                  onChange={onChange}
                  value={password}
                  maxLength={15}
                  required
                />
              </label>
            )}
            <h4> 내용 </h4>
            <textarea
              maxlength={5000}
              style={{ width: 1000, height: 500 }}
              placeholder="*형식 내용 상관없이 모든 문의 가능합니다.
*이메일, 전화번호, 카카오톡 ID 등 어떤 연락처라도 남겨주시면, 그쪽으로 답변드리겠습니다.
*연락처가 없을 시, 댓글로 답변드리겠습니다."
              required
            ></textarea>
            <br></br>
            <input type="submit" value="등록" />
          </form>
          <button onClick={onToggleQuestion}>질문 취소</button>
        </>
      ) : (
        <div>
          <button onClick={onToggleQuestion}>질문하기 </button>
        </div>
      )}
    </div>
  );
}
export default QnA;
