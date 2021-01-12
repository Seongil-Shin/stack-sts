import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authService } from "fbase";

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

function AdminLogin({ userId, setIsLogined }) {
   const classes = useStyles();
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
      <Container component="main" maxWidth="xs">
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign in
            </Typography>
            <form className={classes.form} onSubmit={onSubmit} noValidate>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                  value={email}
                  autoFocus
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onChange}
                  value={password}
                  autoComplete="current-password"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Sign In
               </Button>
            </form>
            <div>{error}</div>
         </div>
      </Container>
   );
}

export default AdminLogin;
