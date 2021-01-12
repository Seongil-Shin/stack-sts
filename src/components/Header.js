import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as ReactLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
   },
   toolbarTitle: {
      flex: 1,
   },
   toolbarSecondary: {
      justifyContent: "space-around",
      overflowX: "auto",
   },
   toolbarLink: {
      padding: theme.spacing(1),
      fontSize: "23px",
      flexShrink: 0,
   },
}));

function Header(props) {
   const classes = useStyles();
   const sections = [
      { title: "홈", url: "/" },
      { title: "인삿말", url: "/greeting" },
      { title: "시공사례", url: "/conscase" },
      { title: "문의", url: "/qna" },
   ];
   const logoURL = process.env.REACT_APP_FULL_LOGO_PATH;

   return (
      <>
         <Typography align="center" noWrap>
            <ReactLink to="/">
               <img src={logoURL} width="455" height="130" alt="error" />
            </ReactLink>
         </Typography>
         <Toolbar
            component="nav"
            variant="regular"
            className={classes.toolbarSecondary}
         >
            {sections.map((section) => (
               <Link
                  color="inherit"
                  noWrap
                  key={section.title}
                  variant="inherit"
                  href={section.url}
                  className={classes.toolbarLink}
               >
                  {section.title}
               </Link>
            ))}
         </Toolbar>
      </>
   );
}
export default Header;
