import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { Link as ReactLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   toolbar: {
      justifyContent: "space-around",
      overflowX: "auto",
   },
   toobarFontSize: {
      fontSize: "23px",
   },
   toobarFontSizeMobile: {
      fontSize: "19px",
   },
   toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 1,
   },
}));

function Header() {
   const classes = useStyles();
   const sections = [
      { title: "홈", url: "/" },
      { title: "인삿말", url: "/greeting" },
      { title: "시공사례", url: "/conscase" },
      { title: "문의", url: "/qna" },
   ];
   const logoImageURL = process.env.REACT_APP_FULL_LOGO_PATH;

   return (
      <>
         <Box align="center">
            <ReactLink to="/">
               <img src={logoImageURL} width="455" height="130" alt="조적STS" />
            </ReactLink>
         </Box>
         <Toolbar
            component="nav"
            variant="regular"
            classes={{
               root: classes.toolbar,
               gutters:
                  window.innerWidth < 340
                     ? classes.toobarFontSizeMobile
                     : classes.toobarFontSize,
            }}
         >
            {sections.map((section) => (
               <Link
                  color="inherit"
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
