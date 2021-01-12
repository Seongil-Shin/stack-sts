import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
   mainFeaturedPost: {
      position: "relative",
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(10),
      heigh: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh",
   },
   overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,.3)",
   },
   mainFeaturedPostContent: {
      position: "relative",
      padding: theme.spacing(5),
      [theme.breakpoints.up("md")]: {
         padding: theme.spacing(6),
         paddingRight: 0,
      },
   },
}));

function Home() {
   const classes = useStyles();
   const [HomePost, setHomePost] = useState({});

   useEffect(() => {
      const homePhotoSwitch = Date.now() % 5;
      if (homePhotoSwitch === 0) {
         setHomePost({
            title: "보증된 신뢰와 정성",
            description:
               "20여년간 쌓아올린 기술력과 경험으로 어떠한 작업도 완벽히 해내겠습니다.",
            image:
               "https://firebasestorage.googleapis.com/v0/b/stacksts.appspot.com/o/baseImage%2Fhome1.jpg?alt=media&token=e0f7c050-e5ea-47ec-bed3-c873c5827d96",
         });
      } else if (homePhotoSwitch === 1) {
         setHomePost({
            title: "끝없는 도전와 혁신",
            description:
               "멈추지않는 도전과 혁신으로 조적의 미래를 이끌겠습니다.",
            image:
               "https://firebasestorage.googleapis.com/v0/b/stacksts.appspot.com/o/baseImage%2Fhome2.jpg?alt=media&token=2a4110b8-79fa-4855-b1ba-5e6908e961ce",
         });
      } else if (homePhotoSwitch === 2) {
         setHomePost({
            title: "보증된 신뢰와 정성",
            description:
               "20여년간 쌓아올린 기술력과 경험으로 어떠한 작업도 완벽히 해내겠습니다.",
            image:
               "https://firebasestorage.googleapis.com/v0/b/stacksts.appspot.com/o/baseImage%2Fhome3.jpg?alt=media&token=0876a63e-91bf-42de-8fc9-c9c36a189071",
         });
      } else if (homePhotoSwitch === 3) {
         setHomePost({
            title: "끝없는 도전와 혁신",
            description:
               "멈추지않는 도전과 혁신으로 조적의 미래를 이끌겠습니다.",
            image:
               "https://firebasestorage.googleapis.com/v0/b/stacksts.appspot.com/o/baseImage%2Fhome4.jpg?alt=media&token=1324f0c6-1655-4bd1-a49a-89e81a9446d3",
         });
      } else if (homePhotoSwitch === 4) {
         setHomePost({
            title: "보증된 신뢰와 정성",
            description:
               "20여년간 쌓아올린 기술력과 경험으로 어떠한 작업도 완벽히 해내겠습니다.",
            image:
               "https://firebasestorage.googleapis.com/v0/b/stacksts.appspot.com/o/baseImage%2Fhome5.jpg?alt=media&token=ecb8e755-d1b5-490b-9d16-720d1e6fc506",
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
         <div className={classes.overlay} />
         <Grid container>
            <Grid item md={6}>
               <div className={classes.mainFeaturedPostContent}>
                  <Typography
                     component="h1"
                     variant="h3"
                     color="inherit"
                     gutterBottom
                  >
                     {HomePost.title}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                     {HomePost.description}
                  </Typography>
               </div>
            </Grid>
         </Grid>
      </Paper>
   );
}

export default Home;
