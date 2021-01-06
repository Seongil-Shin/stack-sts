import React, { useState, useRef } from "react";
import StorageService from "fbase";

function QnA() {
  const [doseQuestion, setDoseQeustion] = useState(true);
  const [question, setQuestion] = useState({
    subject: "",
    password: "",
    text: "",
  });
  const [isPassword, setIsPassword] = useState(true);
  const [uploadFiles, setUploadFiles] = useState([
    {
      id: 1,
      fileURL: "",
    },
  ]);
  const fileId = useRef(2);

  const onChange = (event) => {
    const {
      target: { name, value, files, id },
    } = event;
    if (name === "file") {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setUploadFiles(
          uploadFiles.map((file) =>
            files.id === id ? { ...file, fileURL: result } : file
          )
        );
      };
      reader.readAsDataURL(theFile);
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };
  const onToggleIsPassword = () => {
    setIsPassword((prev) => !prev);
    setQuestion({ ...question, password: "" });
  };
  const onToggleQuestion = () => {
    setDoseQeustion((prev) => !prev);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    setDoseQeustion((prev) => !prev);
  };
  const onFileDelete = (id) => {
    setUploadFiles(uploadFiles.filter((file) => file.id !== id));
  };
  const onAddFile = () => {
    if (uploadFiles.length >= 5) {
      alert("파일은 최대 5개까지 업로드 가능합니다.");
    } else {
      const file = {
        id: fileId.current,
        fileURL: "",
      };

      setUploadFiles([...uploadFiles, file]);
      fileId.current += 1;
    }
  };

  return (
    <div>
      {doseQuestion ? (
        <>
          <form onSubmit={onSubmit}>
            <label>
              {" "}
              제목 :{" "}
              <input
                value={question.subject}
                name="subject"
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
                  name="password"
                  onChange={onChange}
                  value={question.password}
                  maxLength={15}
                  required
                />
              </label>
            )}
            <h4> 내용 </h4>
            <textarea
              name="text"
              value={question.text}
              onChange={onChange}
              maxLength={5000}
              style={{ width: 800, height: 400 }}
              placeholder="*형식 내용 상관없이 모든 문의 가능합니다.
*이메일, 전화번호, 카카오톡 ID 등 어떤 연락처라도 남겨주시면, 그쪽으로 답변드리겠습니다.
*연락처가 없을 시, 댓글로 답변드리겠습니다."
              required
            ></textarea>
            <br></br>
            {uploadFiles.map((file) => (
              <label>
                <input
                  id={file.id}
                  name="file"
                  type="file"
                  onChange={onChange}
                />
                <button onClick={() => onFileDelete(file.id)}>삭제</button>
                <br />
              </label>
            ))}
            <br />
            <button onClick={onAddFile}>파일추가</button>
            <br />
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
