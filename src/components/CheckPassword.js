import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CryptoJS from "crypto-js";

const useStyles = makeStyles({
  container: {
    paddingTop: "5%",
    textAlign: "center",
  },
  inputButton: {
    display: "none",
  },
});

function CheckPassword({ password, onToggleIsPassword, history }) {
  const [checkPassword, setCheckPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const styles = useStyles();

  const goBack = () => {
    history.goBack();
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const hashed = CryptoJS.HmacSHA256(checkPassword, process.env.REACT_APP_SECRET_KEY).toString();
    if (hashed === password) {
      onToggleIsPassword();
      setIsWrong(false);
    } else {
      setIsWrong(true);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCheckPassword((prev) => value);
  };

  return (
    <Container component="main" maxWidth="xs" className={styles.container}>
      <form onSubmit={onSubmit}>
        <label>
          비밀번호 :{" "}
          <input type="password" name="password" onChange={onChange} value={checkPassword} maxLength={15} required />
        </label>
        &nbsp;&nbsp;
        <Button type="submit" variant="outlined" color="primary" size="small">
          확인
        </Button>
      </form>
      {isWrong && <span>잘못된 비밀번호입니다!</span>}
      <br />
      <Button onClick={goBack} variant="outlined" color="secondary" size="small">
        뒤로가기
      </Button>
    </Container>
  );
}
export default CheckPassword;
