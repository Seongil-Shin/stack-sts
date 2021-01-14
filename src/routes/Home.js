import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
   homePhoto: {
      position: "relative",
      backgroundColor: "white",
      marginBottom: theme.spacing(10),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh",
   },
}));

function Home() {
   const classes = useStyles();
   const [HomePost, setHomePost] = useState({});
   const images = [
      process.env.REACT_APP_HOME_1,
      process.env.REACT_APP_HOME_2,
      process.env.REACT_APP_HOME_3,
      process.env.REACT_APP_HOME_4,
      process.env.REACT_APP_HOME_5,
   ];

   useEffect(() => {
      const homePhotoSwitch = Date.now() % 5;
      for (let i = 0; i < 5; i++) {
         if (homePhotoSwitch === i) setHomePost({ image: images[i] });
      }
   }, []);

   return (
      <Paper
         className={classes.homePhoto}
         style={{ backgroundImage: `url(${HomePost.image})` }}
         variant="elevation"
      >
         {
            <img
               style={{ display: "none" }}
               src={HomePost.image}
               alt={HomePost.imageText}
            />
         }
      </Paper>
   );
}

export default Home;
