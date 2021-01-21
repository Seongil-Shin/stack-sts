import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
   homePhoto: {
      position: "relative",
      marginBottom: theme.spacing(10),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh",
   },
}));

//delay 마다 callback 함수를 호출하는 useInterval 함수
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
   const [currentPhoto, setCurrentPhoto] = useState(Date.now() % 4);
   const [seconds, setSeconds] = useState(0);
   const images = useMemo(
      () => [
         process.env.REACT_APP_HOME_1,
         process.env.REACT_APP_HOME_2,
         window.innerWidth < 600
            ? process.env.REACT_APP_HOME_3
            : process.env.REACT_APP_HOME_5,
         process.env.REACT_APP_HOME_4,
      ],
      []
   );

   useInterval(() => {
      setSeconds((prev) => prev + 1);
      setCurrentPhoto(seconds % 4);
   }, 10000);

   return (
      <Paper
         className={classes.homePhoto}
         style={{ backgroundImage: `url(${images[currentPhoto]})` }}
         variant="elevation"
      />
   );
}

export default Home;
