import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CheckIcon from "@material-ui/icons/Check";
import { fireStoreService } from "fbase";

const useStyles = makeStyles({
   questionButton: {
      float: "left",
   },
   pagination: {
      float: "left",
   },
   answeredRow: {
      backgroundColor: "#f1f1f1",
   },
});

function QuestionList({ history }) {
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [questions, setQuestions] = useState([]);
   const [page, setPage] = useState(0);
   const styles = useStyles();

   //질문목록을 불러옴
   const getQuestions = async () => {
      const dbQuestions = await fireStoreService
         .collection("questions")
         .orderBy("createdAt", "desc")
         .get();
      const questionArray = [];
      dbQuestions.forEach((question) => {
         const quesObj = {
            ...question.data(),
            id: question.id,
         };
         questionArray.push(quesObj);
      });
      setQuestions((prev) => questionArray);
   };

   useEffect(() => {
      getQuestions();
   }, []);

   const onDocumentClick = (question) => {
      history.push({
         pathname: history.location.pathname + "/document",
         state: { question: question },
      });
   };
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   return (
      <div>
         <Container maxWidth="lg">
            <Typography component="h1" variant="h4">
               문의 내역
            </Typography>
            <hr />
            {history.location.pathname === "/qna/list" && (
               <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  onClick={() => history.push("/qna")}
                  className={styles.questionButton}
               >
                  질문하기
               </Button>
            )}
            <br />
            <TableContainer component={Container}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell>&nbsp;</TableCell>
                        <TableCell>&nbsp;</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {questions
                        .slice(
                           page * rowsPerPage,
                           page * rowsPerPage + rowsPerPage
                        )
                        .map((question, index) => (
                           <TableRow
                              key={index}
                              onClick={() => onDocumentClick(question)}
                              className={
                                 question.answered ? styles.answeredRow : null
                              }
                           >
                              <TableCell>{question.subject}</TableCell>
                              <TableCell>
                                 {question.answered ? (
                                    <CheckIcon color="secondary" />
                                 ) : (
                                    "  "
                                 )}
                              </TableCell>
                              <TableCell>
                                 {question.password !== "" && (
                                    <LockOutlinedIcon />
                                 )}
                              </TableCell>
                           </TableRow>
                        ))}
                  </TableBody>
               </Table>
               <TablePagination
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10]}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  component="div"
                  count={questions.length}
                  labelRowsPerPage=""
                  labelDisplayedRows={({ from, to }) => `${from}-${to}`}
                  page={page}
                  onChangePage={handleChangePage}
                  className={styles.pagination}
               />
            </TableContainer>
         </Container>
      </div>
   );
}

export default QuestionList;
