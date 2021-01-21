import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { fireStoreService } from "fbase";

const useStyles = makeStyles((theme) => ({
   headContent: {
      padding: theme.spacing(8, 0, 6),
   },
   listContainer: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
   },
   card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      "&:hover": {
         cursor: "pointer",
         color: "black",
         boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
         transition: "all 0.3s",
      },
   },
   cardMedia: {
      height: 150,
      width: "100%",
   },
   footer: {
      padding: theme.spacing(6),
      textAlign: "center",
   },
}));

function ConscaseList({ history }) {
   const [pages, setPages] = useState(1);
   const classes = useStyles();
   const [conscases, setConscases] = useState([]);

   //conscaseList를 파이어스토에서 전부 가져와서, 썸네일, 제목, 아이디만 남김.
   const getConscases = async () => {
      const dbconscases = await fireStoreService
         .collection("conscase")
         .orderBy("createdAt", "desc")
         .get();
      const conscaseArray = [];
      dbconscases.forEach((conscase) => {
         const consData = { ...conscase.data() };
         const consObj = {
            subject: consData.subject,
            thumbnail: consData.thumbnail,
            id: conscase.id,
         };
         conscaseArray.push(consObj);
      });
      setConscases((prev) => conscaseArray);
   };

   useEffect(() => {
      getConscases();
   }, []);

   const onDocumentClick = (conscaseId) => {
      history.push({
         pathname: history.location.pathname + "/document",
         state: { conscaseId: conscaseId },
      });
   };
   const onSeeMoreClick = () => {
      setPages((prev) => prev + 1);
   };

   return (
      <>
         <div className={classes.headContent}>
            <Typography
               component="h1"
               variant="h2"
               align="center"
               color="textPrimary"
               gutterBottom
            >
               시공사례
            </Typography>
         </div>
         <Container className={classes.listContainer} maxWidth="md">
            <Grid container spacing={4}>
               {conscases.slice(0, pages * 6).map((conscase, index) => {
                  return (
                     <Grid
                        item
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        onClick={() => onDocumentClick(conscase.id)}
                     >
                        <Card className={classes.card}>
                           <CardMedia
                              className={classes.cardMedia}
                              image={conscase.thumbnail}
                              src={conscase.thumbnail}
                           />
                           <CardContent>
                              <Typography
                                 gutterBottom
                                 variant="h5"
                                 component="h2"
                              >
                                 {conscase.subject}
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                  );
               })}
            </Grid>
            <footer className={classes.footer}>
               <Button
                  size="large"
                  onClick={onSeeMoreClick}
                  variant="outlined"
                  color="primary"
               >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;더보기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </Button>
            </footer>
         </Container>
      </>
   );
}
export default ConscaseList;
