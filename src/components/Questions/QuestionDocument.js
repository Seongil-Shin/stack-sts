import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CheckPassword from "components/CheckPassword";
import { fireStoreService, storageService } from "fbase";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import CommentContainer from "./CommentContainer";

const useStyles = makeStyles({
   container: {
      paddingTop: "25px",
   },
   goBack: {
      float: "right",
   },
   content: {
      minHeight: 200,
      overflow: "auto",
   },
});

function QuestionDocument({ history }) {
   const location = useLocation();
   const question = location.state.question;
   const [comments, setComments] = useState(question.comment);
   const [isPassword, setIsPassword] = useState(
      question.password !== "" &&
         history.location.pathname !== "/admin/questions/document"
   );

   const styles = useStyles();

   useEffect(() => {
      setComments(question.comment);
   }, [question.comment]);

   const onEditClick = () => {
      history.push({
         pathname: "/qna/list/document/edit",
         state: { question: question, comment: comments },
      });
   };
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
         Object.values(question.files).map(async (file) => {
            await storageService.refFromURL(file.URL).delete();
         });
         goBack();
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
               <Container maxWidth="md" className={styles.container}>
                  <Typography component="h1" variant="h5">
                     {question.subject}
                  </Typography>
                  <hr />
                  <Container disableGutters component="div">
                     <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={goBack}
                        className={styles.goBack}
                     >
                        뒤로가기
                     </Button>
                     <Typography component="h1" variant="h6">
                        {question.writer}
                     </Typography>
                     <div>
                        {Object.values(question.files).map((file, index) => (
                           <div key={index} style={{ overflow: "auto" }}>
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
                  </Container>
                  <br />
                  <br />
                  <Box className={styles.content}>
                     {question.text.split("\n").map((line, index) => {
                        return (
                           <span key={index}>
                              {line}
                              <br />
                           </span>
                        );
                     })}
                  </Box>
                  <Container disableGutters>
                     {(question.password !== "" ||
                        history.location.pathname ===
                           "/admin/questions/document") && (
                        <div>
                           <Button
                              size="small"
                              variant="outlined"
                              color="secondary"
                              onClick={onDelete}
                           >
                              삭제
                           </Button>
                           <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={onEditClick}
                           >
                              수정
                           </Button>
                        </div>
                     )}{" "}
                  </Container>
                  <br />
                  <CommentContainer
                     question={question}
                     history={history}
                     comments={comments}
                     setComments={setComments}
                  />
               </Container>
            </>
         )}
      </>
   );
}
export default QuestionDocument;
