import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
   mainFeaturedPost: {
      position: "relative",
      backgroundColor: "white", //theme.palette.white[800],
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

   useEffect(() => {
      const homePhotoSwitch = Date.now() % 5;
      if (homePhotoSwitch === 0) {
         setHomePost({
            image: process.env.REACT_APP_HOME_1,
         });
      } else if (homePhotoSwitch === 1) {
         setHomePost({
            image: process.env.REACT_APP_HOME_2,
         });
      } else if (homePhotoSwitch === 2) {
         setHomePost({
            image: process.env.REACT_APP_HOME_3,
         });
      } else if (homePhotoSwitch === 3) {
         setHomePost({
            image: process.env.REACT_APP_HOME_4,
         });
      } else if (homePhotoSwitch === 4) {
         setHomePost({
            image: process.env.REACT_APP_HOME_5,
         });
      }
   }, []);

   return (
      <Paper
         className={classes.mainFeaturedPost}
         style={{ backgroundImage: `url(${HomePost.image})` }}
         variant
      >
         {/* Increase the priority of the hero background image */}
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
