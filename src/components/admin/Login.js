import { authService } from "fbase";
import React, { useState } from "react";

function Login({ userId, setIsLogined }) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail((prev) => value);
    } else if (name === "password") {
      setPassword((prev) => value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(email, password);
      if (userId === process.env.REACT_APP_ADMIN_UID) {
        setIsLogined(true);
      } else {
        setIsLogined(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          placeholder="이메일"
          type="text"
          required
          onChange={onChange}
        />
        <input
          name="password"
          value={password}
          placeholder="비밀번호"
          type="password"
          required
          onChange={onChange}
        />
        <input type="submit" value="로그인" />
        <div>{error}</div>
      </form>
    </div>
  );
}
export default Login;
