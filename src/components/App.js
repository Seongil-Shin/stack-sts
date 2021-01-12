import React from "react";
import Container from "@material-ui/core/Container";
import Router from "components/Router";
import Footer from "components/Footer";

function App() {
   return (
      <>
         <Container maxWidth="lg">
            <div>
               <Router />
            </div>

            <footer>
               <Footer />
            </footer>
         </Container>
      </>
   );
}

export default App;
