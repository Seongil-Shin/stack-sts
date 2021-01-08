import React, { useRef, useState } from "react";
import { storageService, fireStoreService } from "fbase";

function Question({ onToggleQuestion }) {
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
      fileName: "",
    },
  ]);
  const fileId = useRef(2);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setQuestion({ ...question, [name]: value });
  };

  const onFileChange = (id, event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    if (theFile !== null) {
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setUploadFiles(
          uploadFiles.map((file) =>
            file.id === id
              ? { ...file, fileURL: result, fileName: theFile.name }
              : file
          )
        );
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onToggleIsPassword = () => {
    setIsPassword((prev) => !prev);
    setQuestion({ ...question, password: "" });
  };

  const initialize = () => {
    setIsPassword((prev) => true);
    setQuestion({ subject: "", password: "", text: "", fileURL: [] });
    setUploadFiles((prev) => [{ id: 1, fileURL: "" }]);
    fileId.current = 2;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const attachFiles = [];
    if (uploadFiles !== null) {
      for (const file of uploadFiles) {
        if (file.fileURL !== "") {
          const attachmentRef = storageService
            .ref()
            .child(`questionFiles/${file.fileName}`);
          const response = await attachmentRef.putString(
            file.fileURL,
            "data_url"
          );
          const tempFile = {
            URL: await response.ref.getDownloadURL(),
            name: file.fileName,
          };
          attachFiles.push(tempFile);
        }
      }
    }
    const fileObj = Object.assign({}, attachFiles);
    const quesObj = {
      subject: question.subject,
      passwoard: question.password,
      text: question.text,
      createdAt: Date.now(),
      files: fileObj,
      answered: false,
    };
    await fireStoreService.collection("questions").add(quesObj);
    onToggleQuestion();
    initialize();
  };

  const onFileDelete = (id, event) => {
    event.preventDefault();
    setUploadFiles(uploadFiles.filter((file) => file.id !== id));
  };

  const onAddFile = (event) => {
    event.preventDefault();
    if (uploadFiles.length >= 5) {
      alert("파일은 최대 5개까지 업로드 가능합니다.");
    } else {
      const file = {
        id: fileId.current,
        fileURL: "",
        fileName: "",
      };

      setUploadFiles([...uploadFiles, file]);
      fileId.current += 1;
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label key="1">
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
        {uploadFiles.map((file, index) => (
          <label key={index}>
            <input type="file" onChange={(e) => onFileChange(file.id, e)} />
            <button onClick={(e) => onFileDelete(file.id, e)}>삭제</button>
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
  );
}
export default Question;
