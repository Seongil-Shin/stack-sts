import React, { useRef, useState } from "react";
import { storageService, fireStoreService } from "fbase";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

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
   fileInput: {
      display: "none",
   },
}));

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
   const styles = useStyles();

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
         password: question.password,
         text: question.text,
         createdAt: Date.now(),
         files: fileObj,
         answered: false,
         comment: {},
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
         <Container maxWidth="md" className={styles.container}>
            <form onSubmit={onSubmit}>
               <TextField
                  value={question.subject}
                  name="subject"
                  onChange={onChange}
                  label="제목"
                  maxLength={120}
                  className={styles.subject}
                  required
               ></TextField>
               <br /> <br />
               <label>
                  비밀번호 :{" "}
                  <Checkbox
                     type="checkBox"
                     onChange={onToggleIsPassword}
                     checked={isPassword}
                     color="primary"
                  />
               </label>
               <br />
               {isPassword ? (
                  <TextField
                     type="password"
                     name="password"
                     onChange={onChange}
                     value={question.password}
                     maxLength={15}
                     required
                  />
               ) : (
                  <MuiAlert elevation={6} variant="filled" severity="warning">
                     비밀번호 미설정 시 문의 삭제 및 수정은 관리자를 통해서만
                     가능합니다.
                  </MuiAlert>
               )}
               <br />
               <br />
               <h4> 내용 </h4>
               <TextField
                  name="text"
                  value={question.text}
                  onChange={onChange}
                  multiline
                  rows="21"
                  className={styles.content}
                  placeholder="*형식 내용 상관없이 모든 문의 가능합니다.
*이메일, 전화번호, 카카오톡 ID 등 어떤 연락처라도 남겨주시면, 그쪽으로 답변드리겠습니다.
*연락처가 없을 시, 댓글로 답변드리겠습니다."
                  required
               />
               <br />
               <br />
               <Container>
                  {uploadFiles.map((file, index) => (
                     <label key={index}>
                        <input
                           id={index}
                           type="file"
                           className={styles.fileInput}
                           onChange={(e) => onFileChange(file.id, e)}
                        />
                        <Button
                           variant="outlined"
                           size="small"
                           color="primary"
                           component="span"
                        >
                           파일추가
                        </Button>
                        {file.fileName !== null && (
                           <span> {file.fileName}</span>
                        )}
                        <Button
                           color="secondary"
                           size="small"
                           variant="outlined"
                           onClick={(e) => onFileDelete(file.id, e)}
                        >
                           삭제
                        </Button>
                        <br />
                     </label>
                  ))}
                  &nbsp;
                  <Box ml={14}>
                     <Button
                        color="primary"
                        variant="outlined"
                        onClick={onAddFile}
                     >
                        파일 개수 추가
                     </Button>
                  </Box>
               </Container>
               <Button type="submit" color="primary" variant="outlined">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </Button>
            </form>
            <br />
            <Button
               onClick={onToggleQuestion}
               color="primary"
               variant="outlined"
            >
               문의목록
            </Button>
         </Container>
      </>
   );
}
export default Question;
