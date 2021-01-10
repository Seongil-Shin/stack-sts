import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import Login from "components/admin/Login";

function Admin() {
  const [init, setInit] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId((prev) => null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {" "}
      {init ? (
        isLogined ? (
          <div>
            <div>어드민 페이지 입니다!</div>
          </div>
        ) : (
          <Login userId={userId} setIsLogined={setIsLogined} />
        )
      ) : (
        <div>initializing...</div>
      )}
    </>
  );
}
export default Admin;
