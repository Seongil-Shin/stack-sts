import React, { useEffect, useMemo, useRef, useState } from "react";
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

const useInterval = (callback, delay) => {
   const savedCallback = useRef();

   useEffect(() => {
      savedCallback.current = callback;
   }, [callback]);

   useEffect(() => {
      function tick() {
         savedCallback.current();
      }
      if (delay !== null) {
         let id = setInterval(tick, delay);
         return () => clearInterval(id);
      }
   }, [delay]);
};

function Home() {
   const classes = useStyles();
   const [HomePost, setHomePost] = useState({});
   const [seconds, setSeconds] = useState(0);
   const images = useMemo(
      () => [
         process.env.REACT_APP_HOME_1,
         process.env.REACT_APP_HOME_2,
         process.env.REACT_APP_HOME_3,
         process.env.REACT_APP_HOME_4,
         process.env.REACT_APP_HOME_5,
      ],
      []
   );

   useInterval(() => {
      setSeconds((prev) => prev + 1);
      setHomePost({ image: images[seconds % 5] });
   }, 10000);

   useEffect(() => {
      const homePhotoSwitch = Date.now() % 5;
      for (let i = 0; i < 5; i++) {
         if (homePhotoSwitch === i) setHomePost({ image: images[i] });
      }
   }, [images]);

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
