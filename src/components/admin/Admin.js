import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import AdminHome from "components/admin/AdminHome";
import Navigation from "components/admin/Navigation";
import AdminLogin from "components/admin/AdminLogin";

function Admin({ userId, setUserId }) {
   const [init, setInit] = useState(false);
   const [isLogined, setIsLogined] = useState(false);
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
         {" "}
         {init ? (
            isLogined || userId === process.env.REACT_APP_ADMIN_UID ? (
               <>
                  <Navigation />
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
