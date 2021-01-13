import React, { useState } from "react";
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

const useStyles = makeStyles({
   questionContainer: {},
   questionButton: {
      float: "left",
   },
   pagination: {
      float: "left",
   },
});

function QuestionList({ onToggleQuestion, questions, history }) {
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [page, setPage] = useState(0);
   const styles = useStyles();

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
      <>
         <Container maxWidth="lg">
            <Typography component="h1" variant="h4">
               문의 내역
            </Typography>
            <hr />
            {history.location.pathname === "/qna" && (
               <Button
                  size="md"
                  variant="outlined"
                  color="primary"
                  onClick={onToggleQuestion}
                  className={styles.questionButton}
               >
                  질문하기
               </Button>
            )}
            <br />
            <TableContainer
               component={Container}
               className={styles.questionContainer}
            >
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
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
                           >
                              <TableCell>{question.subject}</TableCell>
                              <TableCell>
                                 {question.answered ? "완료" : "  "}
                              </TableCell>
                              <TableCell>
                                 {question.password !== "" && "비밀번호"}
                              </TableCell>
                           </TableRow>
                        ))}
                  </TableBody>
               </Table>
               <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={questions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  className={styles.pagination}
               />
            </TableContainer>
         </Container>
      </>
   );
}

export default QuestionList;
