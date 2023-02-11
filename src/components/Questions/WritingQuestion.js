import React, { useEffect, useRef, useState } from "react";
import { storageService, fireStoreService } from "fbase";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Typography from "@material-ui/core/Typography";
import Modals from "./Modal";
import { useLocation } from "react-router-dom";
import { getYYYYMMDD } from "utils/getYYYYMMDD";

import CryptoJS from "crypto-js";

const useStyles = makeStyles((theme) => ({
  container: {
    alignContent: "center",
  },
  subject: {
    width: "70%",
  },
  content: {
    width: "90%",
  },
  writer: {
    width: "30%",
  },
}));

function WritingQuestion({ history }) {
  const [question, setQuestion] = useState({
    subject: "",
    password: "",
    text: "",
    writer: "",
  });
  const [isPassword, setIsPassword] = useState(true); //비밀 번호를 설정할 것인지 확인하는 state
  //현재 쓰기 모드일 때, 업로드 된 파일들. submit 시 여기있는 파일들이 question과 함께 questionObj에 들어가서 업로드 됨.
  const [uploadFiles, setUploadFiles] = useState([]);
  const [isWriting, setIsWriting] = useState(true);
  const location = useLocation();
  const fileId = useRef(2);
  const styles = useStyles();

  useEffect(() => {
    //수정 시 location.state안에 question에 수정할 question 객체가 들어있음.
    //없을 경우 첫 작성 모드. uploadFiles를 초기상태로 셋팅
    if (location.state) {
      setQuestion((prev) => location.state.question);
      if (location.state.question.files !== {}) {
        Object.entries(location.state.question.files).forEach((file, index) => {
          setUploadFiles((prev) => [
            ...prev,
            {
              id: index,
              fileURL: file[1].URL,
              fileName: file[1].name,
            },
          ]);
        });
        fileId.current = Object.entries(location.state.question.files).length + 1;
      }
    } else {
      setUploadFiles([
        {
          id: 1,
          fileURL: "",
          fileName: "",
        },
      ]);
    }
  }, [location]);

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
    if (theFile !== null && theFile !== undefined) {
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setUploadFiles(
          uploadFiles.map((file) => (file.id === id ? { ...file, fileURL: result, fileName: theFile.name } : file))
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
    setQuestion({ subject: "", password: "", text: "", writer: "" });
    setUploadFiles((prev) => [{ id: 1, fileURL: "" }]);
    fileId.current = 2;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsWriting(false);
    const date = new Date();
    const attachFiles = [];
    if (uploadFiles !== null) {
      for (const file of uploadFiles) {
        if (file.fileURL !== "") {
          let tempFile = {};
          //data로 시작되면 첫작성모드이며 스토리지에 업로드 되지않은 것.
          if (file.fileURL.startsWith("data:")) {
            const attachmentRef = storageService.ref().child(`questionFiles/${getYYYYMMDD(date)}-${file.fileName}`);
            const response = await attachmentRef.putString(file.fileURL, "data_url");
            tempFile = {
              URL: await response.ref.getDownloadURL(),
              name: file.fileName,
            };
          } else {
            tempFile = {
              URL: file.fileURL,
              name: file.fileName,
            };
          }
          attachFiles.push(tempFile);
        }
      }
    }
    let commentObj = {};
    //수정 모드일시, 이전에 있던 파일을 삭제했다면 스토리지에서도 지우기.
    //코멘트는 이전에 있던거 그대로 넣기
    if (location.state) {
      Object.entries(location.state.question.files).forEach(async (beforeFile) => {
        let check = false;
        attachFiles.forEach((afterFile) => {
          if (beforeFile[1].URL === afterFile.URL) check = true;
        });
        if (!check) await storageService.refFromURL(beforeFile[1].URL).delete();
      });
      commentObj = location.state.comment;
    }
    const fileObj = Object.assign({}, attachFiles);
    //비밀번호 암호화
    const secret = process.env.REACT_APP_SECRET_KEY;
    const hashed = CryptoJS.HmacSHA256(question.password, secret).toString();

    const quesObj = {
      subject: question.subject,
      writer: question.writer,
      password: hashed,
      text: question.text,
      createdAt: Date.now(),
      files: fileObj,
      answered: false,
      comment: commentObj,
    };

    if (!location.state) {
      await fireStoreService
        .collection("questions")
        .doc(`${getYYYYMMDD(date)}-${quesObj.subject}`)
        .set(quesObj);
    } else {
      await fireStoreService.collection("questions").doc(location.state.question.id).set(quesObj);
    }
    initialize();
    history.push("/qna/list");
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
      {false && <Modals />}
      {isWriting ? (
        <Container maxWidth="md" className={styles.container}>
          <form onSubmit={onSubmit}>
            <TextField
              id="subject"
              value={question.subject}
              name="subject"
              onChange={onChange}
              label="제목"
              maxLength={120}
              className={styles.subject}
              required
            />
            <br /> <br />
            <TextField
              id="writer"
              value={question.writer}
              name="writer"
              onChange={onChange}
              label="작성자"
              maxLength={120}
              className={styles.writer}
              required
            />
            <br /> <br />
            비밀번호 : <Checkbox id="isChecked" onChange={onToggleIsPassword} checked={isPassword} color="primary" />
            <br />
            {isPassword ? (
              <TextField
                id="password"
                type="password"
                name="password"
                onChange={onChange}
                value={question.password}
                maxLength={15}
                required
              />
            ) : (
              <Alert variant="outlined" severity="warning">
                비밀번호 미설정 시 문의 삭제 및 수정은 관리자를 통해서만 가능합니다.
              </Alert>
            )}
            <br />
            <br />
            <h4> 내용 </h4>
            <TextField
              id="content"
              name="text"
              value={question.text}
              onChange={onChange}
              multiline
              rows="21"
              className={styles.content}
              placeholder="*견적 문의는 도면과 현장 위치를 제공해주셔야 가능합니다.
*연락처를 남겨주실 경우, 그 연락처로 답변을 드리겠습니다.
*연락처가 없을 시, 댓글로 답변드리겠습니다.
*답변은 최대 1일 소요됩니다."
              required
            />
            <br />
            <br />
            <Container>
              {uploadFiles.map((file, index) => (
                <label key={index}>
                  <input type={"file"} style={{ display: "none" }} onChange={(e) => onFileChange(file.id, e)} />
                  <Button variant="outlined" size="small" color="primary" component="span">
                    파일선택
                  </Button>

                  {file.fileName !== null && <span> {file.fileName}</span>}
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    size="small"
                    onClick={(e) => onFileDelete(file.id, e)}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                  <br />
                </label>
              ))}
              &nbsp;
              <Box ml={14}>
                <Button color="primary" variant="outlined" onClick={onAddFile}>
                  파일 개수 추가
                </Button>
              </Box>
            </Container>
            <Button type="submit" color="primary" variant="outlined">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </form>
          <br />
          <Button onClick={() => history.push("/qna/list")} color="primary" variant="outlined">
            문의 내역
          </Button>
        </Container>
      ) : (
        <Container align="center">
          <br />
          <Typography component="h1" variant="h5">
            질문이 등록 중입니다...
          </Typography>
          <br />
        </Container>
      )}
    </>
  );
}
export default WritingQuestion;
