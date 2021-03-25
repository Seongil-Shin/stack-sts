import React from "react";
import { Modal as StyledModal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
}));

function ImageModal({ src, showModal }) {
   const styles = useStyles();
   return (
      <StyledModal
         open={showModal}
         aria-labelledby="modal-title"
         aria-describedby="modal-description"
         className={styles.modal}
      >
         <img src={src} alt="error" />
      </StyledModal>
   );
}
export default ImageModal;
