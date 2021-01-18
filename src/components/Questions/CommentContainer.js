import {
   Box,
   Button,
   Container,
   Grid,
   makeStyles,
   TextField,
} from "@material-ui/core";
import { fireStoreService } from "fbase";
import React, { useState } from "react";

const useStyles = makeStyles({
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

function CommentContainer({ question, history, comments, setComments }) {
   const [newComment, setNewComment] = useState("");
   const styles = useStyles();
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
                  <Grid item key={index} className={styles.exComment}>
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
   );
}
export default CommentContainer;
