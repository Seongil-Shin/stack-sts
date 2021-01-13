import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
   menu: {
      float: "left",
   },
});

function Navigation() {
   const styles = useStyles();
   return (
      <Paper className={styles.menu}>
         <MenuList>
            <MenuItem>
               <Link to="/admin">관리자 홈</Link>
            </MenuItem>
            <MenuItem>
               <Link to="/admin/conscase">시공사례 확인</Link>
            </MenuItem>
            <MenuItem>
               <Link to="/admin/questions">문의 확인</Link>
            </MenuItem>
         </MenuList>
      </Paper>
   );
}
export default Navigation;
