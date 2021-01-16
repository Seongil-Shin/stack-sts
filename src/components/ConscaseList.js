import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
   heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
   },
   listContainer: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
   },
   card: {
      padding: 0,
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
      paddingTop: "56.25%", // 16:9
   },
   cardContent: {
      flexGrow: 1,
   },
   footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
   },
}));

function ConscaseList({ conscases, history }) {
   const [pages, setPages] = useState(1);
   const onDocumentClick = (conscaseId) => {
      history.push({
         pathname: history.location.pathname + "/document",
         state: { conscaseId: conscaseId },
      });
   };
   const classes = useStyles();

   const onSeeMoreClick = () => {
      setPages((prev) => prev + 1);
   };
   return (
      <>
         <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
               <Container maxWidth="sm">
                  <Typography
                     component="h1"
                     variant="h2"
                     align="center"
                     color="textPrimary"
                     gutterBottom
                  >
                     시공사례
                  </Typography>
               </Container>
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
                                 title="Image title"
                              />

                              <CardContent className={classes.cardContent}>
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
               <footer className={classes.footer} align="center">
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
         </main>
      </>
   );
}
export default ConscaseList;
