import React from "react";
import { Modal as StyledModal, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
   modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   },
   paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxWidth: "50%",
   },
   button: {
      float: "right",
      "&:hover": {
         cursor: "pointer",
      },
   },
}));

function Modals({ showModal, onCloseModal }) {
   const styles = useStyles();
   const onNoModalClick = () => {
      let expires = new Date();
      expires = expires.setHours(expires.getHours() + 24);
      localStorage.setItem("modalTimeSetForState", expires);
      onCloseModal();
   };
   return (
      <div>
         <StyledModal
            open={showModal}
            onClose={onCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={styles.modal}
         >
            <div className={styles.paper}>
               <div id="modal-title">
                  <Typography components="h1" variant="h5">
                     안내사항
                     <CloseIcon
                        onClick={onCloseModal}
                        className={styles.button}
                     />
                  </Typography>
               </div>
               <br />
               <br />
               <Typography id="modal-description">
                  문의 전에, 당부의 말씀 올립니다.
                  <br />
                  <br />
                  조금이나마 시공비를 줄이고 싶거나, 공사가 임박해 품질이
                  떨어져도 빠르게 쌓는 업체를 찾으시는 분은 저희와 맞지 않는다는
                  점 양해 부탁드립니다.
                  <br />
                  <br />
                  저희 조적STS는 벽돌 한 장에 정성을 다해 쌓음으로써 건물의
                  브랜드 가치를 올립니다. 그러므로 자신이 영원히 살고싶은 집을
                  짓고 싶은 분, 벽돌시공은 조적STS에게 의뢰해주십시오.
                  <br />
                  <br />
                  마지막으로, 좋은 집을 짓고 싶은 꿈은 모두 같다고 생각합니다.
                  그 꿈을 이루시길 항상 기원드립니다.
                  <br />
                  <br />
                  <span style={{ float: "right" }}>조적STS 신태식 올림</span>
                  <br />
                  <br />
                  <Button
                     variant="outlined"
                     color="secondary"
                     onClick={onNoModalClick}
                  >
                     24시간 안보기
                  </Button>
                  &nbsp;
                  <Button
                     variant="outlined"
                     color="primary"
                     onClick={onCloseModal}
                  >
                     닫기
                  </Button>
               </Typography>
            </div>
         </StyledModal>
      </div>
   );
}
export default Modals;

/*
           
            <div id="modal-title">
               <h6>오이치킨</h6>
               <button onClick={onCloseModal}> 지우기 </button>
            </div>
            <div id="modal-description">
               <p>내용</p>
               <button onClick={onNoModalClick}>24시간 안보기</button>
            </div>*/
