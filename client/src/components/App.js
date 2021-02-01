import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Faq from "./faq/Faq";
import Header from "./Header";
import Chatbot from "./chatbot/Chatbot";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <Route exact path="/faq" component={Faq} />
          <Chatbot />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
