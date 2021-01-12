import React, { useState } from "react";

function CheckPassword({ password, onToggleIsPassword, history }) {
  const [checkPassword, setCheckPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  const goBack = () => {
    history.goBack();
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    if (checkPassword === password) {
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
    <div>
      <form onSubmit={onSubmit}>
        <label>
          비밀번호 :{" "}
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={checkPassword}
            maxLength={15}
            required
          />
        </label>
        <input type="submit" value="확인" />
      </form>
      {isWrong && <span>잘못된 비밀번호입니다!</span>}
      <br />
      <button onClick={goBack}>뒤로가기</button>
    </div>
  );
}
export default CheckPassword;
