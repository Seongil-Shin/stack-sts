import React, { useEffect, useState } from "react";
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
   },
   button: {
      float: "right",
      "&:hover": {
         cursor: "pointer",
      },
   },
}));

function Modals() {
   const [showModal, setShowModal] = useState(false);
   const MODAL_TIMESET_FOR_STATE = localStorage.getItem("modalTimeSetForState");
   const styles = useStyles();

   //24시간동안 보지않음을 눌렀는지 확인
   useEffect(() => {
      const handleShowModal = () => {
         if (MODAL_TIMESET_FOR_STATE && MODAL_TIMESET_FOR_STATE > new Date())
            return;
         else setShowModal(true);
      };
      window.setTimeout(handleShowModal, 500);
   }, [MODAL_TIMESET_FOR_STATE]);

   const onCloseModal = () => {
      setShowModal(false);
   };

   const onNoModalFor24HClick = () => {
      let expires = new Date();
      expires = expires.setHours(expires.getHours() + 24);
      localStorage.setItem("modalTimeSetForState", expires);
      onCloseModal();
   };
   return (
      <StyledModal
         open={showModal}
         onClose={onCloseModal}
         aria-labelledby="modal-title"
         aria-describedby="modal-description"
         className={styles.modal}
      >
         <div
            className={styles.paper}
            style={{
               minWidth:
                  window.innerWidth < 1000
                     ? window.innerWidth < 500
                        ? "90%"
                        : "70%"
                     : "50%",
               maxWidth:
                  window.innerWidth < 1000
                     ? window.innerWidth < 500
                        ? "90%"
                        : "70%"
                     : "50%",
            }}
         >
            <div id="modal-title">
               <Typography components="h1" variant="h5">
                  안내사항
                  <CloseIcon onClick={onCloseModal} className={styles.button} />
               </Typography>
            </div>
            <br />
            <br />
            <Typography id="modal-description">
               문의 전에, 당부의 말씀 올립니다.
               <br />
               <br />
               조금이나마 시공비를 줄이고 싶거나, 공사가 임박해 품질이 떨어져도
               빠르게 쌓는 업체를 찾으시는 분은 저희와 맞지 않는다는 점 양해
               부탁드립니다.
               <br />
               <br />
               저희 조적STS는 벽돌 한 장에 정성을 다해 쌓음으로써 건물의 브랜드
               가치를 올립니다. 그러므로 자신이 영원히 살고싶은 집을 짓고 싶은
               분, 벽돌시공은 조적STS에게 의뢰해주십시오.
               <br />
               <br />
               마지막으로, 좋은 집을 짓고 싶은 꿈은 모두 같다고 생각합니다. 그
               꿈을 이루시길 항상 기원드립니다.
               <br />
               <br />
               <span style={{ float: "right" }}>조적STS 신태식 올림</span>
               <br />
               <br />
               <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onNoModalFor24HClick}
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
   );
}
export default Modals;
