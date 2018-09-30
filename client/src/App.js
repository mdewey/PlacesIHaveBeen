import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from "./Components/HomePage.jsx";
import Callback from "./Components/Callback";

class App extends Component {
 render() {
   return (
     <Router>
       <Switch>
         <Route path="/" exact component={HomePage}/>
         <Route path="/callback" exact component={Callback}/>
       </Switch>
     </Router>
   )
 }
}

export default App;
