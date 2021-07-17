import { Route, Switch} from "react-router";
import "./App.css";
import Home from "./views/Home/home.jsx";
import LandingPage from "./views/LandingPage/landingPage.jsx";
import Detail from "./views/Detail/Detail";
import React from "react";
import Form from "./views/form/Form";
import ErrorPage from "./views/error/ErrorPage";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/dogs/:id" component={Detail} />
        <Route exact path="/createdog" component={Form} />
        <Route path="/*" component={ErrorPage}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
