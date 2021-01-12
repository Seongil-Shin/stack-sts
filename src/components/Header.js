import * as React from "react";
import PropTypes from "prop-types";
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
      justifyContent: "space-between",
      overflowX: "auto",
   },
   toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
   },
}));

function Header(props) {
   const classes = useStyles();
   const { sections } = props;
   const logoURL = process.env.REACT_APP_FULL_LOGO_PATH;

   return (
      <React.Fragment>
         <Typography align="center" noWrap>
            <ReactLink to="/">
               <img src={logoURL} width="455" height="130" alt="error" />
            </ReactLink>
         </Typography>
         <Toolbar
            component="nav"
            variant="dense"
            className={classes.toolbarSecondary}
         >
            {sections.map((section) => (
               <Link
                  color="inherit"
                  noWrap
                  key={section.title}
                  variant="body2"
                  href={section.url}
                  className={classes.toolbarLink}
               >
                  {section.title}
               </Link>
            ))}
         </Toolbar>
      </React.Fragment>
   );
}

Header.propTypes = {
   sections: PropTypes.arrayOf(
      PropTypes.shape({
         title: PropTypes.string.isRequired,
         url: PropTypes.string.isRequired,
      })
   ).isRequired,
   title: PropTypes.string.isRequired,
};

export default Header;
