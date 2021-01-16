import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CheckPassword from "components/CheckPassword";
import { fireStoreService, storageService } from "fbase";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

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
   commentContainer: {
      minHeight: 200,
      position: "reletive",
      left: "25%",
   },
   comment: {
      width: "100%",
   },
   commentButton: {
      float: "right",
   },
   exComment: {
      minHeight: 40,
      minWidth: "100%",
   },
   exCommentWriter: {
      float: "left",
   },
   exCommentContent: {
      paddingTop: 10,
      paddingLeft: 20,
      maxWidth: "100%",
      overflow: "auto",
   },
   exCommentDate: {
      float: "right",
   },
});

function QuestionDocument({ history }) {
   const location = useLocation();
   const question = location.state.question;
   const [isPassword, setIsPassword] = useState(
      question.password !== "" &&
         history.location.pathname !== "/admin/questions/document"
   );
   const [newComment, setNewComment] = useState("");
   const [comments, setComments] = useState(question.comment);
   const [nextCommentId, setNextComment] = useState(
      Object.keys(comments).length
   );
   const getDate = (date) => {
      const months = [
         "01",
         "02",
         "03",
         "04",
         "05",
         "06",
         "07",
         "08",
         "09",
         "10",
         "11",
         "12",
      ];

      return (
         date.getYear() -
         100 +
         "/" +
         months[date.getUTCMonth()] +
         "/" +
         (date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate())
      );
   };
   const styles = useStyles();

   useEffect(() => {
      setComments(question.comment);
   }, [question.comment]);

   const onEditClick = () => {
      history.push({
         pathname: "/qna/list/document/edit",
         state: { question: question },
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

   const onSubmit = async (event) => {
      event.preventDefault();
      let newCommentObj = {};
      if (newComment !== "") {
         newCommentObj = {
            comment: newComment,
            createdAt: Date.now(),
            isAdmin:
               history.location.pathname === "/admin/questions/document"
                  ? true
                  : false,
         };
         const questionObj = {
            ...question,
            comment: { ...comments, [nextCommentId]: newCommentObj },
            answered:
               history.location.pathname === "/admin/questions/document"
                  ? true
                  : false,
         };
         await fireStoreService
            .collection("questions")
            .doc(question.id)
            .set(questionObj);

         setComments((prev) => ({
            ...comments,
            [nextCommentId]: newCommentObj,
         }));
         setNewComment((prev) => "");
         setNextComment((prev) => prev + 1);
      }
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
                  </Container>
                  <br />
                  <br />
                  <Box className={styles.content}>
                     <pre>{question.text}</pre>
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
                  <Container
                     disableGutters
                     maxWidth="sm"
                     className={styles.commentContainer}
                  >
                     <form onSubmit={onSubmit}>
                        <span>댓글</span>
                        <br></br>
                        <TextField
                           name="newComment"
                           value={newComment}
                           onChange={onChange}
                           className={styles.comment}
                           multiline
                           rows="3"
                        />
                        <br />
                        <br />
                        <Button
                           type="submit"
                           size="small"
                           variant="outlined"
                           color="primary"
                           className={styles.commentButton}
                        >
                           등록
                        </Button>
                     </form>
                     <br /> <br />
                     <Grid item xs="auto">
                        <Grid container spacing={3}>
                           {Object.values(comments).map((comment, index) => (
                              <Grid
                                 item
                                 key={index}
                                 className={styles.exComment}
                              >
                                 <Box className={styles.exCommentWriter}>
                                    {!comment.isAdmin
                                       ? question.password !== ""
                                          ? question.writer
                                          : "익명"
                                       : "관리자"}
                                 </Box>
                                 <Box className={styles.exCommentDate}>
                                    {getDate(new Date(comment.createdAt))}
                                 </Box>
                                 <br />
                                 <Box className={styles.exCommentContent}>
                                    <pre>{comment.comment}</pre>
                                 </Box>
                              </Grid>
                           ))}
                        </Grid>
                     </Grid>
                  </Container>
               </Container>
            </>
         )}
      </>
   );
}
export default QuestionDocument;
