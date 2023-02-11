import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import AdminHome from "components/admin/AdminHome";
import AdminLogin from "components/admin/AdminLogin";

function Admin({ userId, setUserId }) {
  const [init, setInit] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  //로그인 상태를 확인하고, 로그인돼있지않으면 로그인창을, 돼있으면 홈을 렌더링함.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId((prev) => null);
      }
      setInit(true);
    });
  }, [setUserId]);

  return (
    <>
      {init ? (
        isLogined || userId === process.env.REACT_APP_ADMIN_UID ? (
          <>
            <AdminHome />
          </>
        ) : (
          <AdminLogin userId={userId} setIsLogined={setIsLogined} />
        )
      ) : (
        <div>initializing...</div>
      )}
    </>
  );
}
export default Admin;
