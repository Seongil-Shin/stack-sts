import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Router from "components/Router";
import Footer from "components/Footer";

function App() {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3}>
        <Router />
        <Footer />
      </Paper>
    </Container>
  );
}

export default App;
